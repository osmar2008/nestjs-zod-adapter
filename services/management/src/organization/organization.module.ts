import { Module } from '@nestjs/common'
import { OrganizationService } from './organization.service'
import { OrganizationController } from './organization.controller'
import { ErrorHandlingInterceptor } from '../error-handling/error-handling.interceptor'
import { CreateOrganizationDtoSchemaProvider } from './validator/validator.pipe'
import { CreateOrganizationDto, CreateOrganizationDtoProviders } from './dto/create-organization.dto'

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService, ...CreateOrganizationDtoProviders],
})
export class OrganizationModule {
}
