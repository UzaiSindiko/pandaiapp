const router = require("express").Router()
const QRController = require("../../controllers/QRController")
const { authentication: auth } = require("../../middleware/auth")

router.get("/", auth, QRController.createQrCode)

module.exports = router
