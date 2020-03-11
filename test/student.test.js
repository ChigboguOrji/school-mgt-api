process.env.NODE_ENV = "test";
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const server = require("../server");
const Student = require("../students/students.model");

describe("STUDENT", () => {
  beforeEach(async () => {
    await Student.deleteMany({});
  });

  describe("GET /", () => {
    it("#it returns the student listing", async () => {
      const students = [
        {
          firstname: "Orji",
          lastname: "Bright",
          regno: "202025",
          currentClass: "SS3"
        },
        {
          firstname: "Orji",
          lastname: "Bright",
          regno: "202025",
          currentClass: "SS3"
        }
      ];
      await Student.insertMany(students);
      const res = await chai.request(server).get("/student/");
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
  });

  describe("GET /:regno", () => {
    it("#it returns a student if a valid regno is passed", async () => {
      const student = new Student({
        firstname: "Aaron",
        lastname: "Egbo",
        regno: "202026",
        currentClass: "SS2"
      });

      await student.save();
      const res = await chai.request(server).get(`/student/${student.regno}`);
      expect(res.status).to.equal(200);
      expect(res.body[0]).to.have.property("firstname", student.firstname);
    });
  });

  describe("GET /:invalid-Regno", () => {
    it("#should return 404 when invalid regno is passed", async () => {
      const res = await chai.request(server).get("/student/2020");
      expect(res.status).to.equal(404);
    });
  });

  describe("POST /", () => {
    it("#it should return student when all request body is valid", async () => {
      const student = {
        firstname: "Naza",
        lastname: "Favour",
        regno: "202025",
        currentClass: "JS3"
      };
      const res = await chai
        .request(server)
        .post("/student/")
        .send(student);

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property(
        "firstname",
        student.firstname.toLowerCase()
      );
    });
  });
});
