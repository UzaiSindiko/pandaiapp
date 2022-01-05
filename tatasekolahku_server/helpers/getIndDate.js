/**
 * @returns {String} date with in indonesia with indonesian format  DD/MM/YYYYs Ex: 11/12/2021
 */
module.exports = (d = new Date()) => {
  const date = new Date(d).toLocaleString("en-GB", {
    timeZone: "Asia/Jakarta",
  })
  return date.split(", ")[0]
}
