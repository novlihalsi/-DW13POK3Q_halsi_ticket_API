const Order = require("../models").orders;
const Event = require("../models").events;
const User = require("../models").users;

exports.index = (req, res) => {
  Order.findAll().then(orders => res.send(orders));
};

exports.ordersbyperson = (req, res) => {
  Order.findAll({
    where: { user_id: req.params.id },
    include: [
      { model: Event, as: "events" },
      { model: User, as: "user" }
    ]
  }).then(orders => res.send(orders));
};

exports.ordersbypersonpending = (req, res) => {
  Order.findAll({
    where: { user_id: req.params.id, status: "pending" },
    include: [
      { model: Event, as: "events" },
      { model: User, as: "user" }
    ]
  }).then(orders => res.send(orders));
};

exports.ordersbypersonconfirmed = (req, res) => {
  Order.findAll({
    where: { user_id: req.params.id, status: "confirmed" },
    include: [
      { model: Event, as: "events" },
      { model: User, as: "user" }
    ]
  }).then(orders => res.send(orders));
};

exports.ordersbypersonapproved = (req, res) => {
  Order.findAll({
    where: { user_id: req.params.id, status: "approved" },
    include: [
      { model: Event, as: "events" },
      { model: User, as: "user" }
    ]
  }).then(orders => res.send(orders));
};

exports.show = (req, res) => {
  Order.findOne({
    where: { id: req.params.id }
  }).then(orders => res.send(orders));
};

exports.store = (req, res) => {
  Order.create(req.body).then(orders => {
    res.send({
      message: "success membeli",
      orders
    });
  });
};

exports.update = (req, res) => {
  Order.update(req.body, { where: { id: req.params.id } }).then(orders => {
    res.send({
      message: "success",
      orders
    });
  });
};

exports.delete = (req, res) => {
  Order.destroy({ where: { id: req.params.id } }).then(orders => {
    res.send({
      message: "success",
      orders
    });
  });
};
