/**
 * Custom exception class
 */
class CException extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
    this.name = this.constructor.name
  }
}

module.exports = CException