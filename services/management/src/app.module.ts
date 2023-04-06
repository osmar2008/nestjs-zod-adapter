import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { OrganizationModule } from './organization/organization.module'
import { APP_PIPE } from '@nestjs/core'
import { AdapterValidationPipe } from './adapter-validation.pipe'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: AdapterValidationPipe,
    },
  ],
})
export class AppModule {
}
