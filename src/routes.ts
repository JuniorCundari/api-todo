import { Router } from 'express'

import UserController from './app/controllers/UserController'
import TaskController from './app/controllers/TaskController'

const router = Router()

router.post('/users', UserController.store)

router.get('/tasks', TaskController.index)
router.get('/tasks/:id', TaskController.show)
router.post('/tasks', TaskController.store)
router.put('/tasks/:id', TaskController.update)
router.delete('/tasks/:id', TaskController.delete)

export default router
