import { Length } from 'class-validator'

export class CreateOrganizationDto {
  @Length(1, 256)
  name: string
}
