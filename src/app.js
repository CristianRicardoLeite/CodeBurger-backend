import Express from 'express'
import routes from './routes.js'
import './database/index.js'
import cors from 'cors'

const corsOptions = {
  origin: "https://code-burger-frontend.vercel.app",
  credentials: true,
}
class App {
  constructor() {
    this.app = Express()
    this.app.use(cors(corsOptions))

    this.middlewares()
    this.routes()

  }

  middlewares() {
    this.app.use(Express.json())
    this.app.use('/product-file', Express.static(process.cwd() + '/uploads'))
    this.app.use('/category-file', Express.static(process.cwd() + '/uploads'))
  }

  routes() {
    this.app.use(routes)
  }
}

export default new App().app
