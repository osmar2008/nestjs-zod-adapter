import { BaseModel } from 'src/db/base-model'
import type { CreateOrganizationDtoType } from '../dto/create-organization.dto'

export class Organization extends BaseModel {
  static tableName = 'organization'

  name: CreateOrganizationDtoType['name']
}