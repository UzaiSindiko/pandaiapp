if (process.env.NODE_ENV === "dev") {
  require("dotenv").config()
}
const serverless = require("serverless-http")
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const mongoose = require("mongoose")
const errorHandler = require("./middleware/errorHandler")

const app = express()

const PORT = process.env.PORT || 3001
const URI =
  process.env.URI ||
  "mongodb://127.0.0.1:27017/tatasekolahku_" + process.env.NODE_ENV

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`success connect to mongodb`, URI)
  })
  .catch((err) => {
    console.log(`fail connect to mongodb `, URI)
    console.log(err)
  })

// init mongoose model
require("./models")

const router = require("./routes")

app.get("/", (_, res, next) => {
  try {
    res.json("hello form the other side")
  } catch (err) {
    next(err)
  }
})

app.use("/", router)

app.get("*/", (_, res, next) => {
  try {
    res.status(404).json("the route you looking for doesn't exist")
  } catch (err) {
    next(err)
  }
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`this app is listening to port`, PORT))
// module.exports.handler = serverless(app)
