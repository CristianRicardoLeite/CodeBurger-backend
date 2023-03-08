import * as Yup from 'yup'
import Category from '../models/Category.js'
import User from '../models/User.js'

class CategoryController {
  async store (request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required()
      })

      try {
        await schema.validateSync(request.body, { abortEarly: false })
      } catch (err) {
        return response.status(400).json({ error: err.errors })
      }

      const { admin: isAdmin } = await User.findByPk(request.userId)
      if (!isAdmin) {
        return response.status(401).json()
      }

      const { name } = request.body

      const categoryExist = await Category.findOne({
        where: {
          name
        }
      })

      if (categoryExist) {
        return response.status(400).json('Your category already exist')
      }

      const category = await Category.create({ name })

      return response.status(200).json(category.name)
    } catch (err) {
      console.log(err)
    }
  }

  async index (request, response) {
    const category = await Category.findAll()

    return response.status(200).json(category)
  }
}

export default new CategoryController()
