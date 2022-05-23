'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User);
      Post.belongsToMany(models.User, { as: 'likes', through: models.Like });
      Post.belongsToMany(models.User, { through: models.Comment });
    }
  }
  Post.init({
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    caption: DataTypes.TEXT,
    image: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Image URL must be filled"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};