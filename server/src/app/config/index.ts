import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

export default {
  NODE_ENV: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  app_email: process.env.APP_EMAIL,
  app_pass: process.env.APP_PASS,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API__KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API__SECRET,
  remove_bg_api: process.env.REMOVE_BG_API,
  admin_pass: process.env.Admin_Pass,
};
