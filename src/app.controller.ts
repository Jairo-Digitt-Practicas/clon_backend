import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

interface HelloBody {
  name: string;
  lastname: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  postHello(@Body() helloBody: HelloBody): string {
    return helloBody.name;
  }
}
