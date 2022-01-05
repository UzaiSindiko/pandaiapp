const router = require("express").Router()
const AuthController = require("../../controllers/AuthController")
const { authentication: auth } = require("../../middleware/auth")

router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.post("/token", auth, AuthController.checkToken)
router.patch("/pass", auth, AuthController.changePassword)
router.patch("/user", auth, AuthController.updateUser)

module.exports = router
