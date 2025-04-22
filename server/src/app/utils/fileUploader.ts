import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
import config from '../config';
import AppError from '../Errors/AppError';

const removeBg = async (blob: Blob) => {
  const formData = new FormData();
  formData.append('image_file', blob);
  formData.append('size', 'auto');

  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': config.remove_bg_api!,
    },
    body: formData,
  });
  if (response.ok) {
    return await response.arrayBuffer();
  } else {
    throw new AppError(response.status, `${response.statusText}`);
  }
};

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

const uploadToCloudinary = async (
  file: Express.Multer.File,
): Promise<UploadApiResponse> => {
  try {
    const fileBuffer = fs.readFileSync(file.path);
    const blob = new Blob([fileBuffer]);

    const removedBgArrayBuffer = await removeBg(blob);

    const processedPath = file.path.replace(
      path.extname(file.path),
      'signature-no-bg.png',
    );
    fs.writeFileSync(processedPath, Buffer.from(removedBgArrayBuffer));

    const uploadResult = await cloudinary.uploader.upload(processedPath, {
      public_id: file.originalname,
    });

    fs.unlinkSync(file.path);
    fs.unlinkSync(processedPath);

    return uploadResult;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'message' in error) {
      const typedError = error as UploadApiErrorResponse;
      console.error('Cloudinary Upload Error:', typedError.message);
      throw new AppError(500, typedError.message);
    }
    throw error;
  }
};

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: function (_req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage: storage,
});

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
