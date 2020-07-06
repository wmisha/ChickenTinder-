'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RestaurantVote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      RestaurantVote.belongsTo(models.User, {
        foreignKey: 'user_id',
      })

      RestaurantVote.belongsTo(models.Restaurant, {
        foreignKey: 'restaurant_id',
      })
    }
  };
  RestaurantVote.init({
    user_id: DataTypes.INTEGER,
    restaurant_id: DataTypes.INTEGER,
    vote: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'RestaurantVote',
  });
  return RestaurantVote;
};