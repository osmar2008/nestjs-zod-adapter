import { Injectable } from '@nestjs/common'
import { Todo } from './entities/todo.entity'
import { CreateTodoDTO } from './dto/create-todo.dto'
import { UpdateTodoDTO } from './dto/update-todo.dto'

@Injectable()
export class TodoService {
  async create(todo: CreateTodoDTO) {
    return Todo.query().insert(todo)
  }

  async findAll() {
    return Todo.query()
  }

  async findOne(id: number) {
    return Todo.query().where('id', id)
  }

  async update(id: number, user: UpdateTodoDTO) {
    return Todo.query().updateAndFetchById(id, user)
  }

  async remove(id: number) {
    return Todo.query().deleteById(id)
  }
}