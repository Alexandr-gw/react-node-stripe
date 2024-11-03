const { put, del } = require('@vercel/blob');
async function deleteBlobImage(currentUrl) {
    try {
        if (currentUrl) {
            const filePath = new URL(currentUrl).pathname;
            await del(filePath);
            console.log(`Deleted image at: ${currentUrl}`);
        }
    } catch (error) {
        console.error('Failed to delete Blob image:', error);
        throw new Error('Failed to delete image');
    }
}

module.exports = deleteBlobImage;