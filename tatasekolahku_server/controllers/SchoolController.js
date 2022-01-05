const mongoose = require("mongoose")
const Staff = mongoose.model("Staff")
const School = mongoose.model("School")
// const config = require("../config")
const { constant } = require("../config")
// const helpers = require("../helpers")
const {
  checkType: { isString },
} = require("../helpers")
const { isStringOrEmpty } = require("../helpers/checkType")

class SchoolController {
  static async createSchool(req, res, next) {
    try {
      const { name, address, phone } = req.body
      isString(name, address, phone)

      const user = await Staff.findOne({ _id: req.user })
        .select("account school")
        .lean()

      if (
        !user ||
        user.school ||
        !user.account.some(
          (el) => el === constant.PRINCIPAL || el === constant.ADMINISTRATOR
        )
      ) {
        throw {
          status: 403,
          msg: { ENG: "unauthorized actions", IND: "aktivitas tidak diizikan" },
        }
      }

      const school = await School.create({
        name,
        address,
        phone,
      })

      await Staff.updateOne({ _id: req.user }, { school: school })

      res.json(school)
    } catch (err) {
      next(err)
    }
  }

  static async updateSchool(req, res, next) {
    try {
      const { name, address, phone } = req.body

      isStringOrEmpty(name, address, phone)

      const updateQuery = {}

      if (name) updateQuery.name = name
      if (address) updateQuery.address = address
      if (phone) updateQuery.phone = phone

      const user = await Staff.findOne({ _id: req.user })
        .select("account school")
        .lean()

      if (
        !user.account.some(
          (x) => x === constant.PRINCIPAL || x === constant.ADMINISTRATOR
        )
      ) {
        throw {
          status: 403,
          msg: { ENG: "unauthorized actions", IND: "aktivitas tidak diizikan" },
        }
      }

      const school = await School.findOneAndUpdate(
        {
          _id: user.school,
        },
        updateQuery,
        {
          new: true,
        }
      )
      await Staff.updateOne({ _id: req.user }, { school: school })

      res.json(school)
    } catch (err) {
      next(err)
    }
  }

  static async getSchool(req, res, next) {
    try {
      const user = await Staff.findOne({ _id: req.user })
        .populate("school")
        .select("school")
        .lean()

      res.json(user.school)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = SchoolController
