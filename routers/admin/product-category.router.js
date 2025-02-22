const express = require('express'); 
const router = express.Router(); 
const multer  = require('multer') 
const upload = multer() 
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

const controller = require("../../controller/admin/product-category.controller")
router.get('/', controller.category);
//validate
const validate = require("../../validates/admin/product.validate")

router.get('/create', controller.create);

router.patch('/create',
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost 
);


router.get('/edit/:id', controller.edit);

router.patch('/edit/:id',
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.editPost 
);
module.exports = router; 