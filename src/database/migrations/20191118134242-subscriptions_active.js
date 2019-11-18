module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('subscriptions', 'active', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('subscriptions', 'active');
  },
};
