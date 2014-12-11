"use strict";

module.exports = function(sequelize, DataTypes) {
  var movie = sequelize.define("movie", {
    title: DataTypes.STRING,
    year: DataTypes.STRING,
    imdbID: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return movie;
};
