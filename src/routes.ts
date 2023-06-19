import { Router } from 'express'

import authMiddlewares from './app/middlewares/authMiddlewares'

import UserController from './app/controllers/UserController'
import TaskController from './app/controllers/TaskController'
import LoginController from './app/controllers/LoginController'

const router = Router()

router.post('/login', LoginController.authenticate)
router.post('/register', UserController.store)

router.use(authMiddlewares)

router.get('/users', UserController.index)
router.get('/user', UserController.show)
router.put('/user', UserController.update)
router.delete('/user', UserController.delete)

router.get('/tasks', TaskController.index)
router.get('/task/:id', TaskController.show)
router.post('/task', TaskController.store)
router.put('/task/:id', TaskController.update)
router.delete('/task/:id', TaskController.delete)

export default router
