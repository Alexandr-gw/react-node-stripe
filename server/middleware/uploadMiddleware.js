const { put } = require('@vercel/blob');
const multer = require('multer');
const upload = multer();
const { StatusCodes } = require('http-status-codes');

const uploadToVercelBlob = async (req, res, next) => {
  if (!req.file) {
    return res.status(StatusCodes.BAD_REQUEST).send('No file uploaded.');
  }

  try {
    const blob = await put(req.file.originalname, req.file.buffer, {
      access: 'public',
      contentType: req.file.mimetype,
    });

    req.body.imageUrl = blob.url;
    next();
  } catch (error) {
    console.error('Upload to Vercel Blob failed:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('File upload failed.');
  }
};

module.exports = { upload, uploadToVercelBlob };
