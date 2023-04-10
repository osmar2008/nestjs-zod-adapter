import { Controller, Get, Post, Body, Patch, Param, Delete, Provider } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    return this.userService.create(user)
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: Partial<CreateUserDto>) {
    return this.userService.update(+id, user)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}

export const userProviders: Provider[] = [
  {
    provide: UserController,
    useClass: UserController,
  },
  {
    provide: CreateUserDto,
    useClass: CreateUserDto,
  },
]