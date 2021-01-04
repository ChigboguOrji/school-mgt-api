process.env.NODE_ENV = 'test'
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const Score = require('./model')
const Student = require('../students/model')
const server = require('../../server')

const marks = [
  {
    subject: 'English',
    r_test:  2,
    c_asses: 3,
    test:    5,
    exams:   40,
    total:   50,
    grade:   'pass'
  },
  {
    subject: 'Maths',
    r_test:  2,
    c_asses: 3,
    test:    5,
    exams:   50,
    total:   60,
    grade:   'credit'
  },
  {
    subject: 'Igbo',
    r_test:  10,
    c_asses: 10,
    test:    10,
    exams:   50,
    total:   80,
    grade:   'excellent'
  }
]

// result
describe('RESULT', () => {
  beforeEach(async () => {
    await Student.deleteMany({})
    await Score.deleteMany({})
  })

  describe('GET /', () => {
    it('#returns the data(message and result) of the passed candidadate if validated', async () => {
      const student = new Student({
        firstname:    'Bright',
        lastname:     'orji',
        regno:        '00001',
        currentClass: 'SS2'
      })

      await student.save()

      const score = new Score({
        student:   student.regno,
        classId:   'ss2',
        sessionId: '2019-2020',
        termId:    'first',
        marks:     marks
      })

      await score.save()
      const res = await chai
        .request(server)
        .get(
          `/result/result/1234567890/${score.student}/${score.classId}/2019-2020/${score.termId}`
        )
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('Object')
      expect(res.body).to.have.property('message', 'valid pin')
      expect(res.body).to.have.property('result')
    })

    it('#returns 404 when invalid parameter(pin, regno, class, session,term) is passed', async () => {
      const student = new Student({
        firstname:    'Bright',
        lastname:     'orji',
        regno:        '00001',
        currentClass: 'SS2'
      })

      await student.save()

      const score = new Score({
        student:   student.regno,
        classId:   'ss2',
        sessionId: '2019-2020',
        termId:    'first',
        marks:     marks
      })

      await score.save()
      const res = await chai
        .request(server)
        .get(
          `/result/result/1234567899/${student.regno}/${student.currentClass}/2019-2020/${score.termId}`
        )
      expect(res.status).to.equal(404)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property(
        'message',
        'invalid pin or pin have exceeded maximum usage permitted'
      )
    })

    it('#Finds and remove the desired result entry', async () => {
      const student = new Student({
        firstname:    'Bright',
        lastname:     'orji',
        regno:        '00001',
        currentClass: 'SS2'
      })

      await student.save()

      const score = new Score({
        student:   student.regno,
        classId:   'ss2',
        sessionId: '2019-2020',
        termId:    'first',
        marks:     marks
      })

      await score.save()
      const res = await chai
        .request(server)
        .get(
          `/result/delete/${score.student}/${score.classId}/${score.sessionId}/${score.termId}`
        )
      expect(res.status).to.equal(204)
      expect(res.body).to.be.an('Object')
    })
  })

  // Update result entry
  /* describe("POST /", () => {
    it("#updates result record if existing or create a new record if not existing", async () => {
      const student = new Student({
        firstname: "Bright",
        lastname: "orji",
        regno: "00001",
        currentClass: "SS2"
      });

      await student.save();

      const score = new Score({
        student: student.regno,
        classId: "ss2",
        sessionId: "2019-2020",
        termId: "first",
        marks: marks
      });
      await score.save();
      // console.log("Score before sending to databse", score);

      const updated_score = [
        {
          subject: "CRS",
          r_test: 10,
          c_asses: 10,
          test: 10,
          exams: 50,
          total: 80,
          grade: "excellent"
        }
      ];

      const res = await chai
        .request(server)
        .post(
          `/result/update/${score.student}/${score.classId}/${score.sessionId}/${score.termId}`
        )
        .send(updated_score);
      expect(res.status).to.equal(201);
      expect(res.body).to.be.a("object");
      expect(res.body).to.have.property("message", "Updated successfully");
    });
  }); */
})