const mongoose = require('mongoose')
const Schema = mongoose.Schema
const grades = 'excellent credit distinction pass good fail'.split(' ')

/**
 * @scores
 * @param {number} r_test resumption test
 * @param {number} c_asses continuous assessment
 * @param {number} test termly test
 * @param {number} exam exams score
 * @param {number} total total score in a subject
 */

const Result = new Schema({
  student:    {type: Schema.Types.ObjectId, ref: 'Student'},
  class_id:   String,
  session_id: String,
  term_id:    String,
  scores:     [{subject: String, r_test:  Number, c_asses: Number, test:    Number,
    exams:   Number, total:   Number}],
  grade:   {type: String, lowercase: true, enum: grades},
  average: {type: Number, default: 0}
})

module.exports = mongoose.model('Result', Result)