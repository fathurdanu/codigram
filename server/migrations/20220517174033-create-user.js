'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate:{
          notEmpty: {
            msg: "Username must be filled"
          }
        }
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        validate:{
          notEmpty: {
            msg: "Password must be filled"
          }
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate:{
          notEmpty: {
            msg: "Name must be filled"
          }
        }
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
        validate:{
          notEmpty: {
            msg: "Email must be filled"
          },
          isEmail: {
            msg: "Must be email"
          }
        }
      },
      image: {
        type: Sequelize.STRING,
        validate:{
          notEmpty: {
            msg: "Image URL must be filled"
          },
          isUrl: {
            msg: 'Image mus be URL'
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};