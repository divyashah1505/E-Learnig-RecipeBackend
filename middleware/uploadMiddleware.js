// fileUploadMiddleware.js
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, uuidv4() + '.' + ext);
  },
});

const Uploads = multer({ storage: storage }).fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'videourl', maxCount: 1 },
  { name: 'addrecipesvideos', maxCount: 1 },
  { name: 'thumbnailimage', maxCount: 1 },
]);

module.exports = Uploads;
