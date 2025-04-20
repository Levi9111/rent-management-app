import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
import config from '../config';

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

const uploadToCloudinary = async (
  file: Express.Multer.File,
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(file.path, {
        public_id: file.originalname,
      })
      .then((uploadResult) => {
        resolve(uploadResult);
        fs.unlinkSync(file.path);
      })
      .catch((error: UploadApiErrorResponse) => {
        console.error('Cloudinary Upload Error :', error);
        reject(error);
      });
  });
};

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: function (_req, file, cb) {
    cb(null, file.originalname);
  },
});

// const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 12 * 1024 * 1024,
  },
});

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
