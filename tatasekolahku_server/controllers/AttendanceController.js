const mongoose = require("mongoose")
const Staff = mongoose.model("Staff")
const QRCode = mongoose.model("QRCode")
const Attendance = mongoose.model("Attendance")
const { ObjectId } = mongoose.Types

const config = require("../config")
const { getIndDate } = require("../helpers")
const { isString } = require("../helpers/checkType")

class AttendanceController {
  static async getStaffAttList(req, res, next) {
    try {
      // date format  // MM/DD/YYYY
      const { date } = req.body

      isString(date)

      const user = await Staff.findOne({ _id: req.user })
        .select("school")
        .lean()

      if (!user.school) {
        return res.json([])
      }

      const users = await Staff.find({ school: user.school })
        .select("account name picture")
        .lean()

      const staffAtt = await Attendance.find({
        school: user.school,
        date: getIndDate(date),
      }).lean()

      users.forEach((user) => {
        const attendance = staffAtt.find(
          (x) => x.staff.toString() === user._id.toString()
        )
        if (attendance) {
          user.attendance = {
            date: attendance.date,
            checkInTime: attendance.checkInTime,
          }
        }
      })

      res.json(users)
    } catch (err) {
      next(err)
    }
  }

  static async checkIn(req, res, next) {
    try {
      const { qrCodeId } = req.body

      if (!ObjectId.isValid(qrCodeId)) {
        throw {
          status: 404,
          msg: {
            ENG: "invalid QR code",
            IND: "QR code tidak valid",
          },
        }
      }

      const now = Date.now()

      let docQRCode = await QRCode.aggregate([
        {
          $match: {
            "codeList._id": ObjectId(qrCodeId),
          },
        },
        {
          $unwind: "$codeList",
        },
        {
          $match: {
            "codeList._id": ObjectId(qrCodeId),
          },
        },
        {
          $project: {
            schoolId: "$school",
            _id: "$codeList._id",
            validFrom: "$codeList.validFrom",
            validUntil: "$codeList.validUntil",
          },
        },
      ])

      if (!docQRCode || !docQRCode[0]) {
        throw {
          status: 404,
          msg: {
            ENG: "code is expired",
            IND: "qr code sudah kadaluarsa",
          },
        }
      }

      const { schoolId, validFrom, validUntil } = docQRCode[0]

      if (now < validFrom || now > validUntil) {
        throw {
          status: 404,
          msg: {
            ENG: "code is expired",
            IND: "barcode sudah kadaluarsa",
          },
        }
      }

      const indDate = getIndDate()

      const isAttendanceCreated = await Attendance.findOne({
        date: indDate,
        school: schoolId,
        staff: req.user,
      })

      if (isAttendanceCreated) {
        return res.json(isAttendanceCreated)
      }

      const attendance = await Attendance.create({
        school: schoolId,
        staff: req.user,
        date: indDate,
        checkInTime: Date.now(),
      })

      const user = await Staff.findOne({ _id: req.user })
        .select("account school")
        .lean()

      if (
        !user.school &&
        !user.account.includes(config.constant.ADMINISTRATOR)
      ) {
        await Staff.updateOne({ _id: req.user }, { school: schoolId })
      }

      res.json(attendance)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = AttendanceController
