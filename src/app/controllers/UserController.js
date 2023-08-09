import { v4 } from 'uuid'
import * as Yup from 'yup'
import User from '../models/User.js'
import { Sequelize } from 'sequelize'

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup
        .string()
        .required(),
      email: Yup
        .string()
        .email()
        .required(),
      password: Yup
        .string()
        .required()
        .min(6),
      admin: Yup
        .boolean()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name, email, password, admin } = request.body

    const userExist = await User.findOne({
      where: { email }
    })

    if (userExist) {
      return response.status(409).json({ error: 'User already exist. Chose another one!' })
    }

    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    })

    return response.json(user)
  }
}

export default new UserController()
