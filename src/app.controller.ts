import {Controller, Get, Param, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {ApiParam, ApiTags} from "@nestjs/swagger";
import {SlugDto} from "./app.dto";

@ApiTags('sample')
@Controller('sample')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiParam({ name: 'slug', type: String })
  @Post(':slug/')
  postHello(@Param('slug') slug: SlugDto): string {
    return this.appService.getHello();
  }
}
