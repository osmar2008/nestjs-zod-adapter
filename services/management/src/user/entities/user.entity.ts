import { Model } from 'objection'

export class User extends Model {
  static tableName = 'user'

  companyId: string
  role: string
  name: string
  email: string
}
