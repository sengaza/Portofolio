'use strict';
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    book_id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },

    title: DataTypes.STRING,
    author: DataTypes.STRING,
    price: DataTypes.NUMBER,
    stock: DataTypes.NUMBER
  }, {
    timestamps: false,
    tableName: 'books'
  });
  Books.associate = function (models) {
    // associations can be defined here
  };
  return Books;
};