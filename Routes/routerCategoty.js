const express = require("express");
const router = express.Router();
const categoryController = require("../Controllers/controllerCategoty");
const autorition =require("../middelwares/autorition")

router.get('/getAllCategories', controllerCategoty.getAllCategories);
router.post('/createCategory',autorition.createToken, controllerCategoty.createCategory)

module.exports = router;