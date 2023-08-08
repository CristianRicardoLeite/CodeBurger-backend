import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import configDataBase from '../config/database.js'

import User from '../app/models/User.js'
import Product from '../app/models/Product.js'
import Category from '../app/models/Category.js'

const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize('postgresql://postgres:IUkDlXiGMp72TPuD9lp8@containers-us-west-130.railway.app:7743/railway')
    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models))
  }

  mongo() {
    this.mongoConnection = mongoose.connect('mongodb://mongo:qOl3T72DLuOGspI45kTL@containers-us-west-140.railway.app:7121',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
  }
}

export default new Database()
