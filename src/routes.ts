import { Router } from 'express'

import authMiddlewares from './app/middlewares/authMiddlewares'

import UserController from './app/controllers/UserController'
import TaskController from './app/controllers/TaskController'
import AuthController from './app/controllers/AuthController'

const router = Router()

router.post('/users', UserController.store)
router.post('/auth', AuthController.authenticate)
router.get('/users', authMiddlewares, UserController.index)

router.get('/tasks', TaskController.index)
router.get('/tasks/:id', TaskController.show)
router.post('/tasks', TaskController.store)
router.put('/tasks/:id', TaskController.update)
router.delete('/tasks/:id', TaskController.delete)

export default router
