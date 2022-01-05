const mongoose = require("mongoose")
const Staff = mongoose.model("Staff")
const QRCode = mongoose.model("QRCode")
const { constant } = require("../config")
const helpers = require("../helpers")
const Attendance = mongoose.model("Attendance")
const { getIndDate } = require("../helpers")

class QRController {
  static async createQrCode(req, res, next) {
    try {
      const user = await Staff.findOne({ _id: req.user })
        .select("account school")
        .lean()

      if (
        !user ||
        !user.account.some(
          (el) => el === constant.PRINCIPAL || el === constant.ADMINISTRATOR
        )
      ) {
        throw {
          status: 403,
          msg: { ENG: "unauthorized actions", IND: "aktivitas tidak diizikan" },
        }
      }

      if (!user.school) {
        throw {
          status: 400,
          msg: {
            ENG: "please create school first before creating the QR code",
            IND: "tolong isi data sekolah terlebih dahulu sebelum membuat kode QR",
          },
        }
      }

      const qrCode = await QRCode.findOne({
        school: user.school,
        validUntil: { $gte: Date.now() },
      })

      if (qrCode) {
        return res.json(qrCode.codeList)
      }

      const date = Date.now()

      const codeList = helpers.createQrCode.createList({
        date: date,
      })

      const docQRCode = await QRCode.create({
        initAt: date,
        school: user.school,
        validUntil: date + 43200000, // 43,200,000  equal to 12 hours
        codeList: codeList,
      })

      const indDate = getIndDate()

      await Attendance.create({
        school: user.school,
        staff: req.user,
        date: indDate,
        checkInTime: Date.now(),
      })

      res.json(docQRCode.codeList)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = QRController
