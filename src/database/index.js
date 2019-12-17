/*
  Conecta com o banco de dados
*/
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

// Models
import User from '../app/models/User';
import Students from '../app/models/Students';
import Checkins from '../app/models/Checkins';
import Subscriptions from '../app/models/Subscriptions';
import Enrollments from '../app/models/Enrollments';

const models = [User, Students, Checkins, Subscriptions, Enrollments];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
