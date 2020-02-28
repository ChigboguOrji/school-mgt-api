const Staff = require("./staff.model");

// getting staff listing
exports.getStaffList = async (req, res) => {
  const staffListing = await Staff.find({}, "username staffId");
  if (!staffListing) return res.status(404).send("Not Found");
  return res.status(200).send(staffListing);
};

// getting a staff with id
//  /staff/id/${teacher.staffId}/usrname${teacher.name}/pwd/${teacher.password}
exports.getStaff = async (req, res) => {
  const { id, usrname = usrname.toLowerCase(), pwd } = req.params;
  const staff = await Staff.findOne(
    {
      staffId: id,
      username: usrname,
      password: pwd
    },
    "username staffId"
  );
  if (!staff) return res.status(404).send("Not Found");
  return res.status(200).send(staff);
};

// adding a staff to the list
exports.postAddStaff = async (req, res) => {
  const { firstname, lastname, username, staffId } = req.body;
  if (!firstname || !lastname || !username || !staffId)
    return res.status(400).send("Invalid data");

  const staff = new Staff(req.body);
  await staff.save();
  return res.status(200).send(staff);
};
