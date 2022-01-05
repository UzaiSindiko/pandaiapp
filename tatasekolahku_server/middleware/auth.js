const { verify } = require("../helpers/jwt")
// const mongoose = require("mongoose")

module.exports = {
  authentication(req, res, next) {
    try {
      let getToken
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        getToken = req.headers.authorization.split(" ")[1]
      }
      let decode = verify(getToken)
      req.user = decode.id
      req.username = decode.username
      next()
    } catch (err) {
      return res.status(400).json({
        msg: { ENG: "login required", IND: "silahkan login terlebih dahulu" },
      })
    }
  },

  optionalAuth(req, res, next) {
    try {
      let getToken
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        getToken = req.headers.authorization.split(" ")[1]
        let decode = verify(getToken)
        req.decode = decode
        req.user = decode.id
        req.username = decode.username

        next()
      } else {
        req.user = false
        next()
      }
    } catch (err) {
      req.user = false
      next()
    }
  },

  // isAdmin(req, res, next) {
  //   const id = req.user
  //   Admin.findById(id)
  //     .then((admin) => {
  //       if (admin || admin.operation === "admin") {
  //         next()
  //       } else {
  //         return res.status(403).json({ msg: "unauthorized" })
  //       }
  //     })
  //     .catch(next)
  // },

  // isAdminOrEditor(req, res, next) {
  //   const id = req.user
  //   Admin.findById(id)
  //     .then((admin) => {
  //       if (
  //         admin &&
  //         (admin.operation === "ADMIN" || admin.operation === "EDITOR")
  //       ) {
  //         next()
  //       } else {
  //         return res.status(403).json({ msg: "unauthorized" })
  //       }
  //     })
  //     .catch(next)
  // },
}
