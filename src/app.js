import Express from 'express'
import routes from './routes.js'
import './database/index.js'

class App {
  constructor () {
    this.app = Express()

    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.app.use(Express.json())
    this.app.use('/product-file', Express.static(process.cwd() + '/uploads'))
  }

  routes () {
    this.app.use(routes)
  }
}

export default new App().app
