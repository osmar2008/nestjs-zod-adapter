import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { z } from 'zod'
import { OrganizationService } from '../organization/organization.service'

const NameSchema = z.string().length(255)

const OrganizationSchema = z.object({
  name: z.string().length(255),
})


const uniqueOrganizationName = (organizationService: OrganizationService, organizationSchema: typeof OrganizationSchema) => {
  organizationSchema.transform(async (name, ctx) => {
    const organizations = await organizationService.findAll().where({ name })
    if (organizations.length > 0) {
      return z.NEVER
    }
    return name
  })
}

@Injectable()
export class ValidatorPipe implements PipeTransform {
  constructor(private readonly organizationService: OrganizationService) {
  }

  transform(value: typeof z, metadata: ArgumentMetadata) {
  }
}
