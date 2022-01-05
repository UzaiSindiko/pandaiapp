const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types
const { accountType } = require("../config")

const staffSchema = new Schema({
  account: [
    {
      type: [String],
      enum: accountType,
    },
  ],
  school: {
    type: ObjectId,
    ref: "School",
  },
  name: {
    type: String,
    required: [true, "name is required"],
    minlength: [4, "name minimum is 4 characters"],
    maxlength: [50, "name maximum is 50 characters"],
    trim: true,
    match: [/^[A-Za-z ]+$/, "name only alphabetical a-z / A-Z is allowed"], //alphabetical with space allowed
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  phone: {
    type: String,
    required: [true, "phone is required"],
    match: [
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
      "phone number is not valid",
    ],
  },
  picture: {
    type: String,
  },
})

module.exports = mongoose.model("Staff", staffSchema)
