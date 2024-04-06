const express = require("express")
const router = express.Router()
const {gptController}= require("./../controller/gptController")

router.post("/gptSearch",gptController)
module.exports = router