'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Buyer, {
        foreignKey: 'user_id',
        as: 'buyer'
      });

      User.hasOne(models.Admin, {
        foreignKey: 'user_id',
        as: 'admin'
      });

      User.hasOne(models.Supplier, {
        foreignKey: 'user_id',
        as: 'supplier'
      });
    }
  }
  User.init({
    id_number_type: DataTypes.STRING,
    id_number: DataTypes.STRING,
    full_name: DataTypes.STRING,
    cellphone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};