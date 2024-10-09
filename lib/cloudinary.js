import { v2 as cloudinary } from 'cloudinary';

// Check if Cloudinary environment variables are set
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error('Cloudinary configuration is missing');
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload image to Cloudinary
export async function uploadImage(image) {
  try {
    // Convert image to arrayBuffer and encode it in base64
    const imageData = await image.arrayBuffer();
    const mimeType = image.type;
    const base64Data = Buffer.from(imageData).toString('base64');
    const fileUri = `data:${mimeType};base64,${base64Data}`;

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(fileUri, {
      folder: 'nextjs-course-mutations',  // Specify folder in Cloudinary
    });

    // Return the secure URL of the uploaded image
    return result.secure_url;
  } catch (error) {
    // Log error and throw it for higher-level handling
    console.error('Error uploading image:', error);
    throw new Error('Image upload failed');
  }
}
