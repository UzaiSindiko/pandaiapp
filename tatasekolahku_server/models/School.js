const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schoolSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minlength: [4, "name minimum is 4 characters"],
    maxlength: [300, "name maximum is 300 characters"],
  },
  address: {
    type: String,
    required: [true, "name is required"],
    maxlength: [300, "name maximum is 300 characters"],
  },
  phone: {
    type: String,
  },
  picture: {
    type: String,
  },
})

module.exports = mongoose.model("School", schoolSchema)
