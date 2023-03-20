import { ArgumentMetadata, Injectable, PipeTransform, ValidationPipe } from '@nestjs/common'
import { z, ZodObject } from 'zod'
import { OrganizationService } from '../organization/organization.service'
import { ZodType } from 'zod/lib/types'
import { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe'
import { Organization } from '../organization/entities/organization.entity'

const NameSchema = z.string().min(1).length(255).brand('Name')

const OrganizationSchema = z.object({
  name: NameSchema,
})


type OrganizationType = z.infer<typeof OrganizationSchema>

const organization = OrganizationSchema.safeParse({ name: '' })

@Injectable()
export class AdapterValidatorPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super(options)
  }

  transform(value: any | ZodObject<any>, metadata: ArgumentMetadata) {

    if (value instanceof ZodObject) {
      return value.parse(value)
    }

    return super.transform(value, metadata)

  }
}