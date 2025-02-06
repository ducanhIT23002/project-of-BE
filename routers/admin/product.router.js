
const express = require('express'); // de su dung duoc ham router
const router = express.Router(); // cho phep ham nay duoc su dung nhu la 1 router

const controller = require("../../controller/admin/product.controller")

router.get('/', controller.ProductDashboard);


module.exports = router; 