import * as Yup from 'yup'

import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth.js'

import User from '../models/User.js'

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup
        .string().email().required(),
      password: Yup
        .string().required()
    })

    const passwordOrEmailInvalid = () => {
      return response
        .status(401)
        .json({ error: 'Please, check your data' })
    }

    if (!(await schema.isValid(request.body))) {
      return passwordOrEmailInvalid()
    }
    const { email, password } = request.body

    const user = await User.findOne({
      where: { email }
    })

    if (!user) {
      return passwordOrEmailInvalid()
    }
    if (!(await user.checkPassword(password))) {
      return passwordOrEmailInvalid()
    }

    return response.json({
      id: user.id,
      email,
      name: user.name,
      admin: user.admin,
      token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, { expiresIn: authConfig.expiresIn }
      )
    })
  }
}

export default new SessionController()
