import { Controller, Get } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';


@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return "Buenas tardes gente"
  }

}
