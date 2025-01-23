// tuong tu voi product.router.js

const express = require('express'); // de su dung duoc ham router
const router = express.Router(); // cho phep ham nay duoc su dung nhu la 1 router
const controller = require("../../controller/client/home.controllers")

router.get('/', controller.index);


module.exports = router; 