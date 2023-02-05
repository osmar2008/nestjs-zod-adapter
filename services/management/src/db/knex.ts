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
      user: 'pgadmin',
      password: 'pgpass',
      database: 'management',
    },
    ...knexSnakeCaseMappers(),
  })

  // Give the knex instance to objection.
  BaseModel.knex(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

  const hasTableOrganization = await knex.schema.hasTable('organization')

  if (!hasTableOrganization) {
    await knex.schema.createTable('organization', function (table) {
      table.uuid('id').unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
      table.string('name')
      table.date('createdAt')
    })
  }

  const hasTableUser = await knex.schema.hasTable('user')

  if (!hasTableUser) {
    await knex.schema.createTable('user', function (table) {
      table.uuid('id').unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
      table.uuid('organization_id').references('organization.id')
      table.string('name')
      table.string('email')
      table.string('role')
      table.date('createdAt')
    })
  }

  return knex
}
