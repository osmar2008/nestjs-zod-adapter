import { APP_PIPE, ModuleRef } from '@nestjs/core'
import {
  Optional,
  Inject,
  Provider,
  ValidationPipe,
  ValidationPipeOptions, Injectable,
} from '@nestjs/common'
import type { PipeTransform, Type, ArgumentMetadata } from '@nestjs/common'
import { CreateOrganizationDto } from './organization/dto/create-organization.dto'
import { ZodDtoProviderInterface } from './shared/ZodDtoProviderInterface'
import { isZodDto } from 'nestjs-zod/dto'

type ZodArgumentMetadata = Omit<ArgumentMetadata, 'metatype'> & {
  metatype: Type<any> & { isZodDto: true }
}

type AdapterArgumentMetadata = ArgumentMetadata | ZodArgumentMetadata

function isZodArgumentMetadata(metadata: any): metadata is ZodArgumentMetadata {

  return 'metatype' in metadata && metadata.metatype !== undefined && metadata.metatype !== null && metadata.metatype?.isZodDto
}

@Injectable()
export class ValidationAdapterPipe extends ValidationPipe {

  constructor(private moduleRef: ModuleRef) {
    super({
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    })
  }

  async transform(value: unknown, metadata: AdapterArgumentMetadata): Promise<any> {
    if (isZodArgumentMetadata(metadata)) {
      const service: ZodDtoProviderInterface = this.moduleRef.get(metadata.metatype, { strict: false })
      return service.parse(value)
    }
    return super.transform(value, metadata)
  }
}