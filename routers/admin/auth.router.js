
const express = require('express'); // de su dung duoc ham router
const router = express.Router(); // cho phep ham nay duoc su dung nhu la 1 router
const validate = require("../../validates/admin/auth.validate")
const controller = require("../../controller/admin/auth.controller")

router.get('/login', controller.login);
router.patch('/login', validate.loginPost,controller.loginPost);


module.exports = router; 