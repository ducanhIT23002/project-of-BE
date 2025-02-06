
const express = require('express'); // de su dung duoc ham router
const router = express.Router(); // cho phep ham nay duoc su dung nhu la 1 router

const controller = require("../../controller/admin/dashboard.controller")

router.get('/', controller.dashboard);


module.exports = router; 