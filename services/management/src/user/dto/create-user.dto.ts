import { IS_UUID, IsEmail, Length } from 'class-validator'

export class CreateUserDto {

  organizationId: string

  role: string

  @IsEmail()
  email: string

  @Length(5, 20)
  name: string
}
