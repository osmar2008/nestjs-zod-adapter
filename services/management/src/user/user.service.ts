import { Injectable } from '@nestjs/common'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  async create(user: CreateUserDto) {
    return User.query().insert(user)
  }

  async findAll() {
    return User.query()
  }

  async findOne(id: number) {
    return User.query().where('id', id)
  }

  async update(id: number, user: Partial<CreateUserDto>) {
    return User.query().updateAndFetchById(id, user)
  }

  async remove(id: number) {
    return User.query().deleteById(id)
  }
}
