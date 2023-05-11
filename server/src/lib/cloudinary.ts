import * as cloudinary from "cloudinary";

cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

async function uploadImageToCloudinary(imageURI: string): Promise<string> {
	const data = await cloudinary.v2.uploader.upload(imageURI);
	return data.url;
}

export { uploadImageToCloudinary };
