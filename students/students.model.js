const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  firstname: { type: String, required: true, lowercase: true },
  lastname: { type: String, required: true, lowercase: true },
  regno: {
    type: Schema.Types.Mixed,
    required: true,
    minlength: 6,
    maxlength: 6
  },
  currentClass: {
    type: String,
    enum: ["js1", "js2", "js3", "ss1", "ss2", "ss3"],
    lowercase: true,
    required: true
  }
});

module.exports = mongoose.model("Students", StudentSchema, "students");
