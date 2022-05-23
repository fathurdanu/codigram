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
      User.hasMany(models.Post);
      User.belongsToMany(models.Post, { through: models.Like });
      User.belongsToMany(models.Post, { through: models.Comment });
    }
  }
  User.init({
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Username must be filled"
        },
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password must be filled"
        },
      }
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Name must be filled"
        },
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Email must be filled"
        },
        isEmail: {
          msg: "Must be email"
        }
      }
    },
    image: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function (user, options) {
        user.image = user.image || "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg"
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};