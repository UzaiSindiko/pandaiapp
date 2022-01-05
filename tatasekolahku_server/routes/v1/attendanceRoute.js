const router = require("express").Router()
const AttendanceController = require("../../controllers/AttendanceController")
const { authentication: auth } = require("../../middleware/auth")

router.post("/", auth, AttendanceController.getStaffAttList)
router.post("/check-in", auth, AttendanceController.checkIn)

module.exports = router
