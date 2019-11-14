import Sequelize, { Model } from 'sequelize';

class Students extends Model {
  static init(sequelize) {
    // Super -> classe pai (Model)
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        weight: Sequelize.STRING,
        height: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );
  }
}
export default Students;
