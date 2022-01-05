const router = require("express").Router()
const SchoolController = require("../../controllers/SchoolController")
const { authentication: auth } = require("../../middleware/auth")

router.post("/", auth, SchoolController.createSchool)
router.patch("/", auth, SchoolController.updateSchool)
router.get("/", auth, SchoolController.getSchool)

module.exports = router
