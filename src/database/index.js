/*
  Conecta com o banco de dados
*/
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

// Models
import Students from '../app/models/Students';

const models = [Students];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
