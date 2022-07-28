const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, callback) => {
    console.log(req);
    console.log(file);
    console.log(".......................................");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, Date.now() + '.' + extension);
  }
});
const upload = multer({storage:storage});
module.exports = upload.single("file");



module.exports = multer({storage:storage}).single('file');
