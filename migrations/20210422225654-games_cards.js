'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("games_cards", {
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
      card_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'cards'
          },
          key: 'id'
        },
      },
      isPlayed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      orderInDeck: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      orderInHand: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("games_cards");
  },
};
