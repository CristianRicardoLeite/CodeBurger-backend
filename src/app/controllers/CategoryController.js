import * as Yup from 'yup'
import Category from '../models/Category.js'
import User from '../models/User.js'

class CategoryController {
  async store(request, response) {
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
        return response.status(401).json(isAdmin)
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


      const { filename: path } = request.file

      const { id } = await Category.create({ name, path })


      return response.status(200).json({ id, name })
    } catch (err) {
      console.log(err)
    }
  }

  async index(request, response) {
    const category = await Category.findAll()

    return response.status(200).json(category)
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      path: Yup.string()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)


    if (!isAdmin) {
      return response.status(401).json("Dont authorized")
    }

    const { id } = request.params
    const { name } = request.body

    const categoryExist = await Category.findByPk(id)
    if (!categoryExist) {
      return response.status(404).json("Your category dont exist")
    }

    let path
    if (request.file) {
      path = request.file.filename
    }

    await Category.update({
      name,
      path
    }, { where: { id } })

    return response.status(200).json("Category received your alteration")
  }
}


export default new CategoryController()
