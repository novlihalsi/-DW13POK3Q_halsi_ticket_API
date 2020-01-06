"use strict";
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define(
    "categories",
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING
    },
    {}
  );
  categories.associate = function(models) {
    categories.hasMany(models.events, {
      as: "event",
      foreignKey: "category_id"
    });
  };
  return categories;
};
