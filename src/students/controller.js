const Student = require('./students.model')

// getting a student by regno
exports.getStudents = async (req, res) => {
  const students = await Student.find({})
  if (!students) return res.status(404).send('No student found')
  return res.send(students)
}

exports.getStudent = async (req, res) => {
  const regno = req.params.regno
  if (!regno || regno.length <= 5 || regno.length > 6) {return res.status(404).send('Invalid regno')}

  const student = await Student.find({regno: regno})
  if (!student || !student.length) {return res.status(404).send('Incorrect student regno')}
  return res.status(200).send(student)
}

// Adding new student
exports.postStudent = async (req, res) => {
  const newStudent = new Student(req.body)
  const student = await newStudent.save()
  return res.status(200).send(student)
}