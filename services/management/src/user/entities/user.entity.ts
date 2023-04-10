import { BaseModel } from '../../db/base-model'

export class User extends BaseModel {
  static tableName = 'user'

  organizationId: string
  role: string
  name: string
  email: string
}
