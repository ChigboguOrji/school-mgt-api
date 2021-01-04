const Staff = require('./staff.model')

// getting staff listing
exports.listAll = async (req, res) => {
  const staffListing = await Staff.find({}, 'username userid')
  if (!staffListing) return res.status(404).json({message: 'Not Found'})
  return res.status(200).send(staffListing)
}

// getting a staff with id
exports.staff = async (req, res) => {
  const {userid, username = username.toLowerCase(), password} = req.params
  const staff = await Staff.findOne(
    {
      userid:   userid,
      username: username,
      password: password
    },
    'username userid'
  )
  if (!staff) return res.status(404).send({message: 'Not Found'})
  return res.status(200).json({staff})
}

// adding a staff to the list
exports.addToList = async (req, res) => {
  const {firstname, lastname, username, userid} = req.body
  if (!firstname || !lastname || !username || !userid) {return res.status(400).json({message: 'could not validate data'})}

  const staff = new Staff(req.body)
  await staff.save()
  return res
    .status(201)
    .json({message: 'staff added to the list successfully'})
}

// login
exports.login = async (req, res) => {
  console.table(req.body)
  const {username, userid, password} = req.body
  if (!username || !userid || !password) {return res.status(400).json({message: 'could not validate user data'})}

  const staff = await Staff.find(
    {username, userid, password, banned: false, approved: true},
    'username userid role created'
  )

  if (!staff) {return res.status(404).json({message: 'could not validate user data'})}
  return res.status(200).json(staff)
}