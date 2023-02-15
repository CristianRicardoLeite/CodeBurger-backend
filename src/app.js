import Express from 'express'
import routes from './routes.js'
import './database'

class App {
  constructor () {
    this.app = Express()

    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.app.use(Express.json())
  }

  routes () {
    this.app.use(routes)
  }
}

export default new App().app
