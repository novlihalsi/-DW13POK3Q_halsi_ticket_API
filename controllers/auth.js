const jwt = require("jsonwebtoken");

const models = require("../models");
const User = models.users;

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ where: { email, password } }).then(user => {
    if (user) {
      const token = jwt.sign({ userId: user.id }, "ticket-key");
      res.send({
        user,
        token
      });
    } else {
      res.send({
        error: true,
        message: "Wrong Email or Password!"
      });
    }
  });
};

exports.register = (req, res) => {
  User.create(req.body).then(user => {
    const token = jwt.sign({ userId: user.id }, "ticket-key");
    res.send({
      message: "success",
      user,
      token
    });
  });
};
