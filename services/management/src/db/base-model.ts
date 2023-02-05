import { Model } from 'objection'

export class BaseModel extends Model {
  private createdAt: string

  $beforeInsert() {
    this.createdAt = new Date().toISOString()
  }
}
