import { SafeParseReturnType } from 'zod'

export interface ZodDtoProviderInterface {

  get result(): SafeParseReturnType<any, any>

  parse(input: unknown): Promise<this>
}