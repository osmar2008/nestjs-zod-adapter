import { Injectable } from '@nestjs/common'
import { CreateOrganizationDto } from './dto/create-organization.dto'
import type { CreateOrganizationDtoType } from './dto/create-organization.dto'
import { UpdateOrganizationDto } from './dto/update-organization.dto'
import { Organization } from './entities/organization.entity'


@Injectable()
export class OrganizationService {
  async create(createOrganizationDto: CreateOrganizationDtoType) {
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
