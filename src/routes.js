import { Router } from 'express'

import ProductController from './app/controllers/ProductController.js'
import SessionController from './app/controllers/SessionController.js'
import UserController from './app/controllers/UserController.js'

import multer from 'multer'
import multerConfig from './config/multer.js'

import authMiddleware from './app/middlewares/auth.js'

const upload = multer(multerConfig)

const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/session', SessionController.store)

routes.use(authMiddleware)

routes.get('/products', ProductController.index)
routes.post('/products', upload.single('file'), ProductController.store)

export default routes
