const Favorites = require("../models").favorites;
const Events = require("../models").events;
const Users = require("../models").users;

exports.index = (req, res) => {
  Favorites.findAll().then(favorites => res.send(favorites));
};

exports.favoritebyperson = (req, res) => {
  Favorites.findAll({
    where: { user_id: req.params.id },
    include: [{ model: Events, as: "events" }]
  }).then(favorites => res.send(favorites));
};

exports.show = (req, res) => {
  Favorites.findOne({
    where: { user_id: req.body.user_id, event_id: req.body.event_id }
  }).then(favorites => {
    if (favorites) {
      res.send({ fav: true });
    } else {
      res.send({ fav: false });
    }
  });
};

exports.makefavorite = (req, res) => {
  Favorites.create(req.body).then(favorites => {
    res.send({
      message: "success",
      fav: true
      // favorites
    });
  });
};

exports.delete = (req, res) => {
  Favorites.destroy({
    where: { user_id: req.body.user_id, event_id: req.body.event_id }
  }).then(favorites => {
    res.send({
      message: "success",
      fav: false
    });
  });
};

exports.update = (req, res) => {
  Favorites.update(req.body, { where: { id: req.params.id } }).then(
    favorites => {
      res.send({
        message: "success",
        favorites
      });
    }
  );
};
