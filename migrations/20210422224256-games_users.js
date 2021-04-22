'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("games_users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
      },
      game_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'games'
          },
          key: 'id'
        },
      },
      isHost: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      currentPlayer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      current: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("games_users");
  },
};
