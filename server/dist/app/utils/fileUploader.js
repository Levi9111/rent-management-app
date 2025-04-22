"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploader = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = require("cloudinary");
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../Errors/AppError"));
const removeBg = async (blob) => {
    const formData = new FormData();
    formData.append('image_file', blob);
    formData.append('size', 'auto');
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': config_1.default.remove_bg_api,
        },
        body: formData,
    });
    if (response.ok) {
        return await response.arrayBuffer();
    }
    else {
        throw new AppError_1.default(response.status, `${response.statusText}`);
    }
};
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary_cloud_name,
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret,
});
const uploadToCloudinary = async (file) => {
    try {
        const fileBuffer = fs_1.default.readFileSync(file.path);
        const blob = new Blob([fileBuffer]);
        const removedBgArrayBuffer = await removeBg(blob);
        const processedPath = file.path.replace(path_1.default.extname(file.path), 'signature-no-bg.png');
        fs_1.default.writeFileSync(processedPath, Buffer.from(removedBgArrayBuffer));
        const uploadResult = await cloudinary_1.v2.uploader.upload(processedPath, {
            public_id: file.originalname,
        });
        fs_1.default.unlinkSync(file.path);
        fs_1.default.unlinkSync(processedPath);
        return uploadResult;
    }
    catch (error) {
        if (error && typeof error === 'object' && 'message' in error) {
            const typedError = error;
            console.error('Cloudinary Upload Error:', typedError.message);
            throw new AppError_1.default(500, typedError.message);
        }
        throw error;
    }
};
const storage = multer_1.default.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, path_1.default.join(process.cwd(), 'uploads'));
    },
    filename: function (_req, file, cb) {
        cb(null, file.originalname);
    },
});
exports.upload = (0, multer_1.default)({
    storage: storage,
});
exports.fileUploader = {
    upload: exports.upload,
    uploadToCloudinary,
};
//# sourceMappingURL=fileUploader.js.map