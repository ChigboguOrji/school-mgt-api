const mongoose = require('mongoose')
const Schema = mongoose.Schema
const classEnum = 'js1 js2 js3 ss1 ss2 ss3'.split(' ')

const StudentSchema = new Schema({
  firstname:  {type: String, required: true, lowercase: true},
  middlename: {type: String, lowercase: true},
  lastname:   {type: String, required: true, lowercase: true},
  promoted:   {type: Boolean, default: true},
  approved:   {type: Boolean, default: true},
  admitted:   {type: Boolean, default: true},
  suspended:  {type: Boolean, default: false},
  graduated:  {type: Boolean, default: false},
  regno:      {type: String, required: true, minlength: 6, maxlength: 6},
  classId:    {
    admitted: {
      type:      String,
      enum:      classEnum,
      lowercase: true,
      required:  true
    },
    current: {
      type:      String,
      enum:      classEnum,
      lowercase: true,
      required:  true
    }
  }
})

module.exports = mongoose.model('Students', StudentSchema, 'students')