
const express = require('express'); // de su dung duoc ham router
const router = express.Router(); // cho phep ham nay duoc su dung nhu la 1 router

const controller = require("../../controller/admin/product.controller")


router.get('/', controller.ProductDashboard);
router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch('/change-multi', controller.changeMulti);
router.patch('/delete/:id', controller.delete);


module.exports = router; 