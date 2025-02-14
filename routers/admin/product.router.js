
const express = require('express'); // de su dung duoc ham router
const router = express.Router(); // cho phep ham nay duoc su dung nhu la 1 router

const controller = require("../../controller/admin/product.controller")


router.get('/', controller.ProductDashboard);
router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch('/change-multi', controller.changeMulti);
router.delete('/delete/:id', controller.delete);

// đường dẫn sang trang tạo sản phẩm : GET vì trong file PUG dùng thẻ a 
router.get('/create', controller.create);
// dùng patch để đưa submit form của trang tạo sản phẩm
router.patch('/create', controller.createPost);



module.exports = router; 