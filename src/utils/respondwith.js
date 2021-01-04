/**
 *
 * @param {*} status
 * @param {*} msg
 * @param {*} success
 * @param {*} data
 */
module.exports = (status, msg, success, data) => {
  return {
    status,
    success,
    msg:  msg.charAt(0).toUpperCase() + msg.slice(1),
    data: data ? data : []
  }
}