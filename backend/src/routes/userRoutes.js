const express = require("express")
const router = express.Router()
const {userController}= require("./../controller/userController")

router.post("/signin",userController)


module.exports = router