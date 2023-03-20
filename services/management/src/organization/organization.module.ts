import { Module } from '@nestjs/common'
import { OrganizationService } from './organization.service'
import { OrganizationController } from './organization.controller'
import { ErrorHandlingInterceptor } from '../error-handling/error-handling.interceptor'

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService, ErrorHandlingInterceptor],
})
export class OrganizationModule {}
