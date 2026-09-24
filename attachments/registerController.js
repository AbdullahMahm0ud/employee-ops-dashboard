// const usersDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };
const User = require("../model/User");
// const fsPromises = require("fs").promises;
// const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  //check for duplicated usernames in the database users.json
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate)
    return res
      .sendStatus(409)
      .json({ message: "User exists with this name already!" });
  try {
    //encrypt the pswd with bcrypt
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //create & store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    console.log(result)
    
    res.status(201).json({ success: `New user ${user} created!` });
  } catch {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
