const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Types

const AttendanceSchema = new Schema({
  school: {
    type: ObjectId,
    ref: "School",
  },
  staff: {
    type: ObjectId,
    ref: "Staff",
  },
  date: {
    type: String, // date with format DD/MM/YYYY
    required: [true, "check-in date is required"],
  },
  checkInTime: {
    type: Date,
    required: [true, "check-in time is required"],
  },
})

module.exports = mongoose.model("Attendance", AttendanceSchema)
