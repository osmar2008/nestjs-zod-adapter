import { ValidationOptions, IsBoolean, Length, MinLength } from 'class-validator'

export class CreateTodoDTO {
  @Length(5, 256)
  title: string

  @MinLength(1)
  description: string

  @IsBoolean()
  completed: boolean
}
