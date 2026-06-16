import imageCompression from 'browser-image-compression';

/**
 * Compresses an image aggressively for web to save bandwidth (egress)
 * @param imageFile The original File object
 * @returns A compressed File object
 */
export async function compressImageForWeb(imageFile: File): Promise<File> {
  const options = {
    maxSizeMB: 0.1, // Target max 100KB (aggressive)
    maxWidthOrHeight: 1200, // Max 1200px dimension
    useWebWorker: true,
    fileType: 'image/webp', // Convert to WebP for best compression
    initialQuality: 0.7, // 70% quality is usually indistinguishable for web but saves massive space
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);
    // Ensure it has a .webp extension if the type changed
    const newFileName = imageFile.name.replace(/\.[^/.]+$/, "") + ".webp";
    
    // Create a new File object with the correct name and type
    return new File([compressedFile], newFileName, {
      type: 'image/webp',
    });
  } catch (error) {
    console.error('Error compressing image:', error);
    // Fallback to original if compression fails
    return imageFile;
  }
}
