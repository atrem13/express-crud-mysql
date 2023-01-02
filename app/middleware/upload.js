const multer = require('multer');

const imageFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }else{
        cb('upload image only', 'false');
    }
}

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/resources/static/assets/uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-upload-${file.originalname}`);
    },
})

var uploadFile = multer({storage: storage, fileFilter: imageFilter})

module.exports = uploadFile;