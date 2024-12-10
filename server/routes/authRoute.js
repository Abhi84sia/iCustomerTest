const express = require('express')
const authController = require("../controllers/authController")
const products = require('../controllers/controller')

const router = express.Router()


router.post("/login",authController.login)
router.post("/signup",authController.signup)

router.get("/searchProducts",products.searchProducts)



module.exports = router