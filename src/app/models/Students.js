import Sequelize, { Model } from 'sequelize';

class Students extends Model {
  static init(sequelize) {
    // Super -> classe pai (Model)
    // Ignorar colunas created, primary e foreign keys
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
