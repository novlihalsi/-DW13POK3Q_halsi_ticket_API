"use strict";
module.exports = (sequelize, DataTypes) => {
  const favorites = sequelize.define(
    "favorites",
    {
      user_id: DataTypes.INTEGER,
      event_id: DataTypes.INTEGER
    },
    {}
  );
  favorites.associate = function(models) {
    // associations can be defined here
    favorites.belongsTo(models.events, {
      as: "events",
      foreignKey: "event_id"
    });
    favorites.belongsTo(models.users, {
      as: "user",
      foreignKey: "user_id"
    });
  };
  return favorites;
};
