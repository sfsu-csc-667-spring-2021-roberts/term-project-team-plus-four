'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("games_users_ver2", {
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
      is_host: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      current_player_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      current: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("games_users");
  },
};
