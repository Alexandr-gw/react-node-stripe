const fs = require('fs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
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

const upload = multer({ storage: storage });

module.exports = upload;