'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("games", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      startDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
        allowNull: false,
      },
      hasStarted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      direction: {
        type: Sequelize.BOOLEAN,
        defaultValue: Sequelize.literal(1),
        allowNull: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("games");
  },
};

