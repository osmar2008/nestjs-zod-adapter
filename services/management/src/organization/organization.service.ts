import { Injectable } from '@nestjs/common'
import { CreateOrganizationDto } from './dto/create-organization.dto'
import { UpdateOrganizationDto } from './dto/update-organization.dto'
import { Organization } from './entities/organization.entity'

@Injectable()
export class OrganizationService {
  create(createOrganizationDto: CreateOrganizationDto) {
    return Organization.query().insert(createOrganizationDto)
  }

  findAll() {
    return Organization.query()
  }

  findOne(id: number) {
    return Organization.query().findById(id)
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return Organization.query().update().where('id', id)
  }

  remove(id: number) {
    return Organization.query().delete().where('id', id)
  }
}
