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

type ZodArgumentMetadata = Omit<ArgumentMetadata, 'metatype'> & {
  metatype: Type<any> & { isZodDto: true }
}

class Test {
  type: 'body'
  static isZodDto: true
}

const testInstance: AdapterArgumentMetadata = new Test()

type AdapterArgumentMetadata = ArgumentMetadata | ZodArgumentMetadata

function isZodArgumentMetadata(metadata: AdapterArgumentMetadata): metadata is ZodArgumentMetadata {

  return true
}

@Injectable()
export class AdapterValidationPipe extends ValidationPipe {

  constructor(private moduleRef: ModuleRef) {
    super({
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    })
  }

  async transform(value: unknown, metadata: AdapterArgumentMetadata): Promise<any> {
    if (isZodArgumentMetadata(metadata)) {
      const service: InstanceType<typeof CreateOrganizationDto> = this.moduleRef.get(metadata.metatype, { strict: false })
      return service.parse(value)
    }
    return super.transform(value, metadata)
  }
}