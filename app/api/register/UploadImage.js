'use server';
import fs from 'fs';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';

// Function to generate a unique file name
const generateUniqueFileName = (originalFileName) => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
    const fileExtension = originalFileName.split('.').pop(); // Extract file extension
    return `${timestamp}_${randomString}.${fileExtension}`;
}

export const UploadImage = async (logo) => {
    try {
        const bytes = await logo.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Correct the path to point to the public folder in the project
        const externalPath = path.join(process.cwd(), 'public'); // Updated path to the public folder
        let originalFileName = logo.name.replace(/ /g, "_");
        let uniqueFileName = generateUniqueFileName(originalFileName);
        let targetPath = path.join(externalPath, uniqueFileName);

        // Ensure the public folder exists (this should usually already exist)
        try {
            await mkdir(externalPath, { recursive: true }); // Create the directory recursively if it doesn't exist
        } catch (mkdirError) {
            if (mkdirError.code !== 'EEXIST') {
                console.error('Error creating directory:', mkdirError);
                return { success: false };
            }
        }

        // Write the file to the specified target path
        await writeFile(targetPath, buffer);
        return { uniqueFileName, success: true };
    } catch (error) {
        console.error('Error handling file upload:', error);
        return { success: false };
    }
}
