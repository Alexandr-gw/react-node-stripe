const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { upload: vercelBlobUpload } = require('@vercel/blob'); 
const { StatusCodes } = require('http-status-codes');

const isProduction = process.env.NODE_ENV === 'production';

let storage;

if (isProduction) {
  storage = multer.memoryStorage(); 
} else {
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dirPath = process.env.UPLOAD_DIR || path.join(__dirname, '../uploads');
      
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      console.log('Attempting to save file to destination:', dirPath);
      cb(null, dirPath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileName = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
      cb(null, fileName);
    }
  });
}

const upload = multer({ storage: storage }); 

const handleFileUpload = async (req, res, next) => {
  if (isProduction) {
    if (!req.file) {
      return next();
    }

    try {
      const uploadResponse = await vercelBlobUpload(req.file.buffer, {
        contentType: req.file.mimetype,
        originalName: req.file.originalname,
      });

      req.fileUrl = uploadResponse.url; // Save the URL of the uploaded file to req
      next();
    } catch (error) {
      console.error('Error uploading file to Vercel Blob:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to upload file to cloud storage' });
    }
  } else {
    if (req.file) {
      req.fileUrl = `/uploads/${req.file.filename}`;
    }
    next();
  }
};

module.exports = {
  upload, 
  handleFileUpload
};
