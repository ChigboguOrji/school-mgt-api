const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const roles = "superuser admin".split(" ");

const StaffSchema = new Schema({
  firstname: { type: String, required: true, lowercase: true },
  lastname: { type: String, required: true, lowercase: true },
  username: { type: String, required: true, lowercase: true },
  userid: { type: Schema.Types.Mixed, required: true, unique: true },
  password: { type: Schema.Types.Mixed, required: true },
  role: { type: String, enum: roles, default: "admin" },
  approved: { type: Boolean, default: true },
  banned: { type: Boolean, default: false },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Staff", StaffSchema, "staff");
