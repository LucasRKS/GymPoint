/*
  Conecta com o banco de dados
*/
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

// Models
import User from '../app/models/User';
import Student from '../app/models/Student';
import Checkin from '../app/models/Checkin';
import HelpOrder from '../app/models/HelpOrder';
import Subscription from '../app/models/Subscription';
import Enrollment from '../app/models/Enrollment';

const models = [User, Student, Checkin, HelpOrder, Subscription, Enrollment];

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
