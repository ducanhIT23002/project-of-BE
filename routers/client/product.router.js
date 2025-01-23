// trang router cua trang product
// trang nay la quan ly router khac voi cach nhung JS cua file main cua project( index.js)

const express = require('express'); // de su dung duoc ham router
const router = express.Router(); // cho phep ham nay duoc su dung nhu la 1 router
const controller = require("../../controller/client/product.controllers")

// vi ben kia da /products ne ben nay khong can nua , vi file nay la quan ly router cua trang product
router.get('/', controller.index)

// router.get('/edit', async (req, res) => {
//     res.render("client/pages/product/index")
// })

// router.get('/delete', async (req, res) => {
//     res.render("client/pages/product/index")
// })

module.exports = router; // dung nhu cach nhung JS cua file main cua project( index.js) de day sang file quan ly router