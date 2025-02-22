const express = require('express'); // de su dung duoc ham router
const router = express.Router(); // cho phep ham nay duoc su dung nhu la 1 router

const controller = require("../../controller/admin/roles.controller")


router.get('/', controller.rolePer);
router.get('/permissions', controller.Permission);
router.patch('/permissions', controller.PatchPermission);

module.exports = router; 