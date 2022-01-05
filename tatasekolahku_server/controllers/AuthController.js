const mongoose = require("mongoose")
const Staff = mongoose.model("Staff")
const config = require("../config")
const helpers = require("../helpers")
const {
  checkType: { isString },
} = require("../helpers")

class AuthController {
  static async register(req, res, next) {
    try {
      const { name, password, account } = req.body

      isString(name, req.body.phone, password, account)

      if (!name.match(/^[A-Za-z ]+$/)) {
        throw {
          status: 400,
          msg: {
            ENG: "name only alphabetical a-z / A-Z is allowed",
            IND: "nama hanya boleh mengandung huruf, simbol dan angka tidak dibenarkan",
          },
        }
      }

      // change all phone start from 08**** to +628***
      const phone =
        req.body.phone.substring(0, 2) === "08"
          ? "+628" + req.body.phone.substring(2)
          : req.body.phone

      if (!config.accountType.includes(account)) {
        throw {
          status: 400,
          msg: { ENG: "invalid account type", IND: "tipe akun tidak valid" },
        }
      }

      const isPhoneUsed = await Staff.findOne({ phone: phone })
        .select("_id")
        .lean()

      if (isPhoneUsed) {
        throw {
          status: 400,
          msg: {
            ENG: "phone already registered",
            IND: "nomor telepon sudah terdaftar",
          },
        }
      }

      const user = await Staff.create({
        account,
        name,
        password: helpers.bcrypt.hash(password),
        phone,
      })

      delete user.password

      const token = helpers.jwt.generateToken({
        id: user._id,
        username: user.username,
      })

      res.status(201).json({ token, userData: user })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { password } = req.body

      isString(req.body.phone, password)

      const phone =
        req.body.phone.substring(0, 2) === "08"
          ? "+628" + req.body.phone.substring(2)
          : req.body.phone

      const user = await Staff.findOne({ phone: phone }).lean()

      if (!user) {
        throw {
          status: 403,
          msg: {
            ENG: "incorrect phone number or password",
            IND: "katasandi atau nomor telepon salah",
          },
        }
      }

      const isPasswordCorrect = helpers.bcrypt.compare(password, user.password)
      if (!isPasswordCorrect) {
        throw {
          status: 403,
          msg: {
            ENG: "incorrect phone number or password",
            IND: "katasandi atau nomor telepon salah",
          },
        }
      }

      const token = helpers.jwt.generateToken({
        id: user._id,
        email: user.email,
        username: user.username,
      })

      res.status(201).json({ token, userData: user })
    } catch (err) {
      next(err)
    }
  }

  static async checkToken(req, res, next) {
    try {
      const user = await Staff.findOne({ _id: req.user })
        .select("-password")
        .lean()

      if (!user) {
        throw {
          status: 403,
          msg: {
            ENG: "token tidak valid",
            IND: "invalid token",
          },
        }
      }

      res.status(201).json({ userData: user })
    } catch (err) {
      next(err)
    }
  }

  // forget password

  static async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body

      isString(currentPassword, newPassword)

      const user = await Staff.findOne({ _id: req.user })
        .select("password")
        .lean()

      const isPasswordCorrect = helpers.bcrypt.compare(
        currentPassword,
        user.password
      )

      if (!isPasswordCorrect) {
        throw {
          status: 403,
          msg: { ENG: "incorrect password", IND: "password salah" },
        }
      }

      await Staff.updateOne(
        {
          _id: req.user,
        },
        {
          password: helpers.bcrypt.hash(newPassword),
        }
      )

      res.json()
    } catch (err) {
      next(err)
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { name, email, phone } = req.body

      if (phone) {
        const isPhoneUsed = await Staff.findOne({
          _id: { $ne: req.user },
          phone: phone,
        })
          .select("_id")
          .lean()

        if (isPhoneUsed) {
          throw {
            status: 400,
            msg: {
              ENG: "phone already registered",
              IND: "nomor telepon sudah terdaftar",
            },
          }
        }
      }

      if (email) {
        const isEmailUsed = await Staff.findOne({
          _id: { $ne: req.user },
          email: email,
        })
          .select("_id")
          .lean()

        if (isEmailUsed) {
          throw {
            status: 400,
            msg: {
              ENG: "email already registered",
              IND: "email sudah terdaftar",
            },
          }
        }
      }

      const user = await Staff.findOneAndUpdate(
        { _id: req.user },
        {
          email,
          name,
          phone,
        },
        {
          runValidators: true,
          new: true,
        }
      )
        .select("-password")
        .lean()

      res.json(user)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = AuthController
