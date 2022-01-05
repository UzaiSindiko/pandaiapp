const jwt = require("jsonwebtoken")
const config = require("../config")

module.exports = {
  createList({ date = Date.now() }) {
    const result = []
    const twoMinuteInMillisecond = 120000
    for (let i = 1; i <= config.twelveHoursDividedBy2minute; i++) {
      const codeForQr = {
        validFrom: date + (i - 1) * twoMinuteInMillisecond,
        validUntil: date + i * twoMinuteInMillisecond + 60000,
      }

      result.push(codeForQr)
    }
    return result
  },
  create({ schoolId, validUntil }) {
    const qrToken = jwt.sign(
      {
        schoolId: schoolId,
        validUntil: validUntil,
      },
      config.QRSecret
    )

    return qrToken
  },
}
