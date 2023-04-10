import { Inject, Injectable } from '@nestjs/common'
import type { Provider } from '@nestjs/common'
import { z, SafeParseReturnType } from 'zod'
import { CreateOrganizationSharedSchema, CreateOrganizationSharedDtoType, NameSharedSchema } from '@shared/types'
import { OrganizationService } from '../organization.service'
import { RefinementCtx } from 'nestjs-zod/z'
import { ZodDtoProviderInterface } from '../../shared/ZodDtoProviderInterface'


const isOrganizationNameUnique = (organizationService: OrganizationService) => async (name: string, context: RefinementCtx) => {
  const result = await organizationService.findAll().where({ name })
  if (result.length > 0) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Organization name must be unique',
    })
    return z.NEVER
  }
  return name
}

const getUniqueOrganizationNameSchema = (organizationService: OrganizationService) => NameSharedSchema.transform(isOrganizationNameUnique(organizationService)).brand('UniqueOrganizationName')

const getCreateOrganizationDtoSchema = (organizationService: OrganizationService) => {
  return CreateOrganizationSharedSchema.extend({ name: getUniqueOrganizationNameSchema(organizationService) })
}


type CreateOrganizationDtoSchemaType = ReturnType<typeof getCreateOrganizationDtoSchema>

export type CreateOrganizationDtoType = z.infer<CreateOrganizationDtoSchemaType>


@Injectable()
export class CreateOrganizationDto implements ZodDtoProviderInterface {
  private static readonly isZodDto = true
  private _result: SafeParseReturnType<CreateOrganizationSharedDtoType, CreateOrganizationDtoType>

  get result() {
    return this._result
  }

  private set result(result) {
    this._result = result
  }

  constructor(@Inject('createOrganizationDTOSchema') private createOrganizationDtoSchema: typeof CreateOrganizationSharedSchema, private organizationService: OrganizationService) {
  }

  async parse(input: unknown) {
    const organizationDtoSchema = getCreateOrganizationDtoSchema(this.organizationService)
    this._result = await organizationDtoSchema.safeParseAsync(input)
    return this
  }
}

export const CreateOrganizationDtoProviders: Provider[] = [
  {
    provide: 'createOrganizationDTOSchema',
    useValue: CreateOrganizationSharedSchema,
  },
  {
    provide: CreateOrganizationDto,
    useClass: CreateOrganizationDto,
  },
]
