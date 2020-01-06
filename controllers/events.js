const Events = require("../models").events;
const Users = require("../models").users;
const Categories = require("../models").categories;
const Sequelize = require("sequelize");

exports.index = (req, res) => {
  Events.findAll({
    include: [
      { model: Users, as: "user" },
      { model: Categories, as: "category" }
    ]
  })
    .then(events => res.send(events))
    .catch(e => res.send(e));
};

exports.eventtoday = (req, res) => {
  Events.findAll({
    where: {
      startTime: {
        $gte: Sequelize.literal("2019-12-28")
      }
    },
    include: [
      { model: Users, as: "user" },
      { model: Categories, as: "category" }
    ]
  })
    .then(events => res.send(events))
    .catch(e => res.send(e));
};

exports.related = (req, res) => {
  Events.findAll({
    where: { category_id: req.params.id },
    include: [
      { model: Users, as: "user", attributes: ["fullname"] },
      {
        model: Categories,
        as: "category"
      },
      {
        model: Comments,
        as: "commentId",
        include: [
          { model: Users, as: "usersComment", attributes: ["fullname"] }
        ]
      }
    ]
  }).then(events => res.send(events));
};

exports.show = (req, res) => {
  Events.findOne({ where: { id: req.params.id } }).then(events =>
    res.send(events)
  );
};

exports.detailevents = (req, res) => {
  Events.findOne({
    where: { id: req.params.id },
    include: [
      { model: Users, as: "user", attributes: ["fullname", "image", "email"] },
      {
        model: Categories,
        as: "category"
      }
    ]
  }).then(events => res.send(events));
};

exports.store = (req, res) => {
  Events.create(req.body).then(events => {
    res.send({
      message: "success",
      events
    });
  });
};

exports.update = (req, res) => {
  Events.update(req.body, { where: { id: req.params.id } }).then(events => {
    res.send({
      message: "success",
      events
    });
  });
};

exports.delete = (req, res) => {
  Events.destroy({ where: { id: req.params.id } }).then(events => {
    res.send({
      message: "success",
      events
    });
  });
};
