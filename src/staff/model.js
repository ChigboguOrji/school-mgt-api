const mongoose = require('mongoose')
const Schema = mongoose.Schema
const roles = 'member form_teacher principal admin'.split(' ')
const gender = 'male female unspecified'.split(' ')

const Staff = new Schema({
  _id:          {type: Schema.Types.ObjectId},
  first_name:   {type: Schema.Types.String, required: true, lowercase: true},
  middle_name:  {type: Schema.Types.String, lowercase: true},
  last_name:    {type: Schema.Types.String, required: true, lowercase: true},
  staff_id:     {type: Schema.Types.Mixed, required: true, unique: true},
  email:        {type: Schema.Types.String, required: true},
  password:     {type: Schema.Types.Mixed, required: true},
  roles:        [{type: Schema.Types.Array, enum: roles, default: 'member'}],
  is_suspended: {type: Schema.Types.Boolean, default: false},
  gender:       {type: Schema.Types.String, enum: gender, default: 'unspecified'}
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

module.exports = mongoose.model('Staff', Staff)