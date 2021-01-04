const mongoose = require('mongoose')
const Schema = mongoose.Schema
const classEnum = 'js1 js2 js3 ss1 ss2 ss3'.split(' ')

const Student = new Schema({
  _id:           {type: Schema.Types.ObjectId},
  first_name:    {type: Schema.Types.String, required: true, lowercase: true},
  middle_name:   {type: Schema.Types.String, lowercase: true},
  last_name:     {type: Schema.Types.String, required: true, lowercase: true},
  is_promoted:   {type: Schema.Types.Boolean, default: true},
  is_admitted:   {type: Schema.Types.Boolean, default: true},
  is_suspended:  {type: Schema.Types.Boolean, default: false},
  has_graduated: {type: Schema.Types.Boolean, default: false},
  reg_no:        {type: Schema.Types.String, required: true},
  is_verified:   {type: Schema.Types.Boolean, default: false},
  admitted_to:   {type:      String, enum:      classEnum, lowercase: true,
    required:  true},
  current_class: {type:      String, enum:      classEnum, lowercase: true,
    required:  true}
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

module.exports = mongoose.model('Student', Student)