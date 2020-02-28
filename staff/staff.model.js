const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
  firstname: { type: String, required: true, lowercase: true },
  lastname: { type: String, required: true, lowercase: true },
  username: { type: String, required: true, lowercase: true },
  staffId: { type: Schema.Types.Mixed, required: true, unique: true },
  password: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Staff", StaffSchema, "staff");
