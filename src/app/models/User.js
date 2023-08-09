import Sequelize, { Model } from 'sequelize'

import bcrypt from 'bcryptjs'


class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
      admin: Sequelize.BOOLEAN
    },
      {
        sequelize
      }
    )

    this.addHook('beforeSave', async (user) => {
      if (user.password) {

        let salt = bcrypt.genSaltSync(10);
        user.password_hash = await bcrypt.hashSync(user.password, salt);
      }
    })

    return this
  }

  checkPassword(password) {
    return bcrypt.compareSync(password, this.password_hash)
  }
}

export default User
