import Sequelize, { Model } from 'sequelize';

class Subscriptions extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.NUMERIC,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default Subscriptions;
