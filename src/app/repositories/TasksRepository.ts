import { v4 } from 'uuid'

let tasks = [
  {
    id: v4(),
    title: 'Estudar lógica de programação',
    isCompleted: false,
  },
  {
    id: v4(),
    title: 'Treinar',
    isCompleted: false,
  },
  {
    id: v4(),
    title: 'Estudar inglês',
    isCompleted: false,
  },
]

class TasksRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(tasks)
    })
  }

  findById(id: string) {
    return new Promise((resolve) => {
      resolve(tasks.find((task) => task.id === id))
    })
  }

  create(title: string, isCompleted: boolean) {
    return new Promise((resolve) => {
      const newTask = {
        id: v4(),
        title,
        isCompleted,
      }

      tasks.push(newTask)
      resolve(newTask)
    })
  }

  update(id: string, title: string, isCompleted: boolean) {
    return new Promise((resolve) => {
      const updatedTask = {
        id,
        title,
        isCompleted,
      }

      tasks = tasks.map((task) => (task.id === id ? updatedTask : task))

      resolve(updatedTask)
    })
  }

  delete(id: string) {
    return new Promise((resolve) => {
      tasks = tasks.filter((task) => task.id !== id)
      resolve(tasks)
    })
  }
}

export = new TasksRepository()
