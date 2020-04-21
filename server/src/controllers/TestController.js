const config = require('../config/config');
const User = require('../models/Users/User.model');

module.exports = {
  async test(req, res) {
    res.send("Hello from Node.js app \n");
  },
  async list(req, res) {
    const users = await User.find();

    res.json(users);
  },
  async create(req, res) {
    const user = new User({ username: "userTest" });

    await user.save().then(() => console.log("User created"));

    res.send("User created \n");
  }
}
