import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setupDB } from './db/knex'
import { useContainer } from 'class-validator'

async function bootstrap() {
  await setupDB()

  const app = await NestFactory.create(AppModule)

  await app.listen(process.env.PORT || 4001)
}

bootstrap()
