import { Injectable } from '@nestjs/common'
import { CreateOrganizationDto } from './dto/create-organization.dto'
import { UpdateOrganizationDto } from './dto/update-organization.dto'
import { Organization } from './entities/organization.entity'

type Some<T> = { __tag: 'Some', data: T }
type None = { __tag: 'None', data: never }

function isSome<T>(option: Option<T>): option is Some<T> {
  return option.__tag === 'Some'
}

type Option<T> = None | Some<T>


@Injectable()
export class OrganizationService {
  async create(createOrganizationDto: CreateOrganizationDto) {
    return Organization.query().insert(createOrganizationDto)
  }

  findAll() {
    return Organization.query()
  }

  findOne(id: string) {
    return Organization.query().findById(id)
  }

  update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    return Organization.query().update().where('id', id)
  }

  remove(id: string) {
    return Organization.query().delete().where('id', id)
  }
}
