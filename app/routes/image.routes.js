module.exports = app => {
    const images = require('../controllers/image.controller');
    const upload = require("../middleware/upload");

    var router = require('express').Router();

    router.post("/upload", upload.single("file"), images.uploadFiles);
  
    app.use('/api/images', router);
}