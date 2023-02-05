import { Model } from 'objection'

export class BaseModel extends Model {
  createdAt: string

  $beforeInsert() {
    this.createdAt = new Date().toISOString()
  }
}
