import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { TodoService } from './todo.service'
import { CreateTodoDTO } from './dto/create-todo.dto'
import { UpdateTodoDTO } from './dto/update-todo.dto'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() todo: CreateTodoDTO) {
    return this.todoService.create(todo)
  }

  @Get()
  findAll() {
    return this.todoService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() todo: UpdateTodoDTO) {
    return this.todoService.update(+id, todo)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id)
  }
}
