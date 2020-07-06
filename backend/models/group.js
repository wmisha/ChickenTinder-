'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.belongsToMany(models.User, {
        through: models.UserGroup,
        foreignKey: 'group_id'
      })

      Group.belongsToMany(models.Restaurant, {
        through: models.RestaurantGroup,
        foreignKey: 'group_id'
      })
    }
  };

  Group.init({
    owner_id: DataTypes.INTEGER,
    group_name: DataTypes.STRING,
    location: DataTypes.STRING,
    join_code: DataTypes.INTEGER,
    Disactive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Group',
    
  });
  return Group;
};