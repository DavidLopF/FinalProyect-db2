'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Supplier.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Supplier.hasMany(models.Product, {
        foreignKey: 'supplier_id',
        as: 'products'
      });
      
    }
  }
  Supplier.init({
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Supplier',
  });
  return Supplier;
};