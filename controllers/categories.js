const Category = require("../models").categories;
const Event = require("../models").events;
const User = require("../models").users;

exports.index = (req, res) => {
  Category.findAll({ attributes: ["id", "name", "image"] }).then(categories =>
    res.send(categories)
  );
};

exports.show = (req, res) => {
  Category.findOne({
    where: { id: req.params.id },
    attributes: ["id", "name", "image"]
  }).then(categories => res.send(categories));
};

exports.showEvent = (req, res) => {
  Category.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Event,
        as: "event",
        include: [{ model: User, as: "user" }]
      }
    ]
  }).then(categories => res.send(categories));
};

exports.store = (req, res) => {
  Category.create(req.body).then(categories => {
    res.send({
      message: "success",
      categories
    });
  });
};

exports.update = (req, res) => {
  Category.update(req.body, { where: { id: req.params.id } }).then(
    categories => {
      res.send({
        message: "success",
        categories
      });
    }
  );
};

exports.delete = (req, res) => {
  Category.destroy({ where: { id: req.params.id } }).then(categories => {
    res.send({
      message: "success",
      categories
    });
  });
};
