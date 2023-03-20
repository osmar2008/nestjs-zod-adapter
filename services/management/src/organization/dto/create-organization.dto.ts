import { Length } from 'class-validator'

export class CreateOrganizationDto {
  @Length(1, 2)
  name: string
}
