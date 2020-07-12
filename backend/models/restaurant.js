'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Restaurant.belongsToMany(models.Group, {
        through: models.RestaurantGroup,
        foreignKey: 'restaurant_id'
      })

      Restaurant.hasMany(models.RestaurantVote, {
        foreignKey: 'restaurant_id'
      })
      // define association here
    }
  };
  Restaurant.init({
    group_id: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    location: DataTypes.STRING,
    price: DataTypes.INTEGER,
    distance: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    url: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};