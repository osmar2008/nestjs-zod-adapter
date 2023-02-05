import { IsEmail, Length } from 'class-validator'

export class UserDTO {
  @IsEmail()
  email: string

  @Length(5, 20)
  name: string
}
