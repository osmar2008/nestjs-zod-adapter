import { knexSnakeCaseMappers } from 'objection'
import Knex from 'knex'
import { BaseModel } from './base-model'

export async function setupDB() {
  // Initialize knex.
  const knex = Knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'postgres',
    },
    ...knexSnakeCaseMappers(),
  })

  // Give the knex instance to objection.
  BaseModel.knex(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

  const hasTable = await knex.schema.hasTable('todo')

  if (!hasTable) {
    await knex.schema.createTableIfNotExists('todo', function (table) {
      table.uuid('id').unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
      table.uuid('user_id')
      table.string('title')
      table.string('description')
      table.boolean('completed')
      table.date('created_at')
    })
  }

  return knex
}
