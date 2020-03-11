const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const grades = "excellent credit distinction pass good fail".split(" ");

const ScoreSchema = new Schema({
  student: { type: Schema.Types.Mixed, required: true },
  classId: String,
  sessionId: String,
  termId: String,
  marks: [
    {
      subject: { type: String, lowercase: true },
      r_test: Number,
      c_asses: Number,
      test: Number,
      exams: Number,
      total: Number,
      grade: {
        type: String,
        lowercase: true,
        enum: grades
      }
    }
  ]
});

module.exports = mongoose.model("Score", ScoreSchema, "scores");
