const env = (name) => {
  const value = process.env[name]
  if (!value) console.log(`ERROR: env key "${name}" not found\n`)
  return value
}

const constant = {
  TEACHER: "TEACHER",
  PRINCIPAL: "PRINCIPAL",
  ADMINISTRATOR: "ADMINISTRATOR",
  // --
  IOS: "IOS",
  ANDROID: "ANDROID",
  WINDOWS: "WINDOWS",
  MAC: "MAC",
  LINUX: "LINUX",
}

module.exports = {
  constant: constant,
  twelveHoursDividedBy2minute: 360,
  jwtSecret: env("JWT_SECRET"),
  QRSecret: env("QR_SECRET"),
  accountType: [constant.TEACHER, constant.PRINCIPAL, constant.ADMINISTRATOR],
  deviceType: [
    constant.IOS,
    constant.ANDROID,
    constant.WINDOWS,
    constant.MAC,
    constant.LINUX,
  ],
}
