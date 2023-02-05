import { Model } from 'objection'

export class Todo extends Model {
  static tableName = 'todo'

  userId: string
  title: string
  description: string
  completed: boolean
}
