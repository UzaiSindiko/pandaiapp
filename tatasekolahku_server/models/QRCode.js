const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const qrCodeSchema = new Schema({
  school: {
    type: ObjectId,
    ref: "School",
  },
  initAt: {
    type: Date,
    default: Date.now(),
  },
  validUntil: {
    type: Date,
  },
  codeList: [
    {
      validFrom: {
        type: Date,
      },
      validUntil: {
        type: Date,
      },
    },
  ],
})

module.exports = mongoose.model("QRCode", qrCodeSchema)
