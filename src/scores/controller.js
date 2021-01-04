const Student = require('../students/model')
const Score = require('./model')

class ScoresCtl {
  async addScoreEntry() {

  }
}

// pin codes
const resultPin = [
  {code: 1234567890, available: true, useCount: 0},
  {code: 1234567891, available: true, useCount: 0},
  {code: 1234567892, available: true, useCount: 0}
]

// GET result entry
exports.entry = async (req, res) => {
  const {pin, regno, classId, sessionId, termId} = req.params
  if (!pin || !regno || !classId || !sessionId || !termId) {
    return res.status(400).json({message: 'Invalid request parameter(s)'})
  }
  // check valid pin
  const validPin = resultPin.find(
    (pincode) =>
      pincode.code === parseInt(pin) &&
      pincode.available &&
      pincode.useCount <= 3
  )
  // return error if invalid pin
  if (!validPin || validPin === 'undefined') {
    return res.status(404).json({
      message: 'invalid pin or pin have exceeded maximum usage permitted'
    })
  }

  // validate student id
  await Score.findOne(
    {student: regno, classId, sessionId, termId},
    'marks',
    (err, result) => {
      if (err) return res.status(404).json({message: 'Error'})
      return res.status(200).json({message: 'valid pin', result: result})
    }
  )
}

// DELETE result entry
// :regno/:classId/:sessionId/:termId
exports.deleteEntry = async (req, res) => {
  const {regno, classId, sessionId, termId} = req.params
  await Score.deleteOne(
    {
      student:   regno,
      classId:   classId,
      sessionId: sessionId,
      termId:    termId
    },
    (err, deleted) => {
      if (err) {return res.status(400).json({message: 'Error deleting record'})}
      if (!deleted) {return res.status(404).json({message: 'Record not found'})}
      return res.status(204).json({message: 'Deletion successful'})
    }
  ).catch((err) => console.log(err))
}

// POST update a result entry
exports.updateEntry = async (req, res) => {
  const {regno, classId, sessionId, termId} = req.params
  // console.log(req.body, regno, classId, sessionId, termId);
  const record = await Score.findOne({
    student: regno,
    classId,
    sessionId,
    termId
  })
  if (!record) {
    return res.status(400).json({message: 'Record could not be found'})
  }
  console.log('Before update record is ', record)
  Object.assign({}, record, {
    marks: req.body
  })
  Score.updateOne(record).then((err, saved) => {
    if (err) return res.status(400).json({message: 'Failed updating record'})
    if (saved) return res.status(201).json({message: 'Updated successfully'})
  })
  console.log('After update record is ', record)
}