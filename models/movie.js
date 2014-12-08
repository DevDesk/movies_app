"use strict";

module.exports = function(sequelize, DataTypes) {
  var Movie = sequelize.define("Movie", {
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

  return Movie;
};
