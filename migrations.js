module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      timestamps: true,
    });

    await queryInterface.createTable('utm_info', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      utm_campaign: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      utm_medium: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      utm_source: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      landed_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      referrer_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    }, {
      timestamps: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('utm_info');
    await queryInterface.dropTable('users');
  },
};
