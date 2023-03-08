import * as Yup from 'yup'

import Category from '../models/Category.js'
import Product from '../models/Product.js'
import Order from '../schemas/Order.js'

class OrderController {
  async store (request, response) {
    const schema = Yup.object().shape({
      products: Yup
        .array()
        .required()
        .of(
          Yup.object().shape({
            id: Yup
              .number()
              .required(),
            quantity: Yup
              .number()
              .required()
          })
        )
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const productsId = request.body.products.map(product => product.id)

    const updateProducts = await Product.findAll({
      where: {
        id: productsId
      },
      include: [{
        model: Category,
        as: 'category',
        attributes: ['name']
      }]
    })

    const editedProductToClientView = updateProducts.map(product => {
      const productIndex = request.body.products.findIndex(requestProduct => requestProduct.id === product.id)

      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category.name,
        ulr: product.url,
        quantity: request.body.products.quantity
      }

      return newProduct
    })

    const order = {
      user: {
        id: request.userId,
        name: request.userName
      },
      products: editedProductToClientView,
      status: 'Pedido Realizado'
    }

    const orderResponse = await Order.create(order)

    return response.status(201).json(orderResponse)
  }
}

export default new OrderController()
