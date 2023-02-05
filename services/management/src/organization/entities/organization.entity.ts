import { BaseModel } from 'src/db/base-model'

export class Organization extends BaseModel {
  static tableName = 'organization'

  name: string
}
