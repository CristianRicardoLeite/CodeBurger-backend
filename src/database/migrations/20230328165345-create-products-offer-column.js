

module.exports = {
  up: async  (queryInterface, Sequelize) => {
     await queryInterface.addColumn('products', 'offer', { 
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false 
    });     
  },

  down: async  (queryInterface) => {
  await queryInterface.removeColumn('products', 'offer');
  }
};
