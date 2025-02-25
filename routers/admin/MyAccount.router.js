const express = require('express'); // de su dung duoc ham router
const router = express.Router(); // cho phep ham nay duoc su dung nhu la 1 router
const multer  = require('multer') 
const upload = multer() 
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

const controller = require("../../controller/admin/MyAccount.controller")


router.get('/', controller.MyAccount);
router.get('/edit', controller.EditMyAccount);
router.patch('/edit',
    upload.single('avatar'),
    uploadCloud.upload,
    controller.EditMyAccountPost
    );
module.exports = router; 