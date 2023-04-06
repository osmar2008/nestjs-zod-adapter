import {
  ArgumentMetadata,
  BadRequestException,
  FactoryProvider,
  Inject,
  Injectable,
  createParamDecorator, ExecutionContext,
  PipeTransform, OnModuleInit,
} from '@nestjs/common'
import {
  z,
  objectOutputType,
  ZodTypeDef,
  ZodObject,
  ZodSchema,
  ZodTypeAny,
  ZodEffects,
  RefinementCtx,
  AnyZodObject,
} from 'nestjs-zod/z'
import { OrganizationService } from '../organization.service'
import { CreateOrganizationSharedSchema, NameSharedSchema } from '@shared/types'
import { ModuleRef } from '@nestjs/core'
import * as module from 'module'
import { OrganizationController } from '../organization.controller'
import type { Type } from '@nestjs/common/interfaces/type.interface'

type ZodSchemaBuilder = (moduleRef: ModuleRef) => (schema: ZodTypeAny) => ZodTypeAny

function assertModuleRef(moduleRefInject: { providerRef?: OrganizationService | undefined }): asserts moduleRefInject is { providerRef: OrganizationService } {
  if (!moduleRefInject.providerRef || !(moduleRefInject.providerRef instanceof OrganizationService)) {
    throw new Error('ModuleRef was not injected on ZodValidator Param')
  }
}

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

const CreateOrganizationDtoSchema = (organizationService: OrganizationService) => {
  return CreateOrganizationSharedSchema.extend({ name: NameSharedSchema.transform(isOrganizationNameUnique(organizationService)).brand('UniqueName') })
}

interface MergedType<T = any> extends Type<T> {
  name: string
}

const getSchemaDto = <SchemaType extends z.ZodTypeAny, ProviderType extends MergedType<any>>(schema: SchemaType, ...providers: ProviderType[]) => {
  @Injectable()
  class SchemaWrapper implements OnModuleInit {

    public readonly isZodDto = true
    public schema = schema
    public providers: Record<string, any>

    constructor(public moduleRef: ModuleRef) {
    }

    onModuleInit(): void {

      providers.forEach(provider => {

        if (provider) {
          this.providers[provider.name] = this.moduleRef.get(provider)
        }
      })
    }

    create(input: unknown) {
      return this.schema.parse(input)
    }
  }

  return SchemaWrapper
}

export class CreateOrganizationSchemaDto extends getSchemaDto(CreateOrganizationSharedSchema) {
}

export const CreateOrganizationDtoSchemaProvider: FactoryProvider<CreateOrganizationDto> = {
  provide: CreateOrganizationDtoSchema,
  inject: [OrganizationService],
  useFactory: (organizationService: OrganizationService) => {
    return CreateOrganizationDtoSchema(organizationService)
  },
}

export const isFunction = (val: any): val is Function =>
  typeof val === 'function'

export type CreateOrganizationDto = ReturnType<typeof CreateOrganizationDtoSchema>
export type OrganizationDto = z.infer<CreateOrganizationDto>

export const organizationSchema = z.object({ name: z.string().min(1).max(255) })



