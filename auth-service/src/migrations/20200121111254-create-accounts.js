/**
 * Migration definition for creating the accounts table into the database.
 * 
 * Please see [this](https://sequelize.org/master/manual/model-basics.html#data-types)
 * for more details on defining table schema.
 */
'use strict';

const TABLE_NAME = "Accounts";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable(
      TABLE_NAME,
      {
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        username: {
          type: Sequelize.STRING(55),
          unique: true,
          allowNull: false,
        },
        passwordHash: {
          type: Sequelize.STRING, // VARCHAR(255)
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable(TABLE_NAME);
  }
};
