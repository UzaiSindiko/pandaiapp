const router = require("express").Router()
const authRoute = require("./authRoute")
const qrCodeRoute = require("./qrCodeRoute")
const schoolRoute = require("./schoolRoute")
const attendanceRoute = require("./attendanceRoute")

router.use("/auth", authRoute)
router.use("/qr", qrCodeRoute)
router.use("/school", schoolRoute)
router.use("/attendance", attendanceRoute)
module.exports = router
