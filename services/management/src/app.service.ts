import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World! - Management Application running on port: ${process.env.PORT || 4000}`
  }
}
