import dotenv from "dotenv";

const envFiles = {
  development: ".env.development",
  production: ".env.production",
};

dotenv.config({ path: envFiles[process.env.NODE_ENV] });

export const PORT = process.env.PORT || 5000;

export const DB_URI = process.env.DB_URI;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SEC;

export const SERVER_URI = process.env.SERVER_URL;

export const RESET_CLIENT_URL = process.env.CLIENT_URL;

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;

export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const SERVER_EMAIL_USER = process.env.SERVER_EMAIL_USER;

export const SERVER_EMAIL_PASS = process.env.SERVER_EMAIL_PASS;
