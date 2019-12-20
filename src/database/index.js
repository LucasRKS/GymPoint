import Sequelize from 'sequelize';
import mongoose from 'mongoose';

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
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://192.168.99.100:27017/gympoint',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
