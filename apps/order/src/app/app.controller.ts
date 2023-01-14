import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { AppService } from './app.service';
import { OrderConfig, orderConfig } from './config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(orderConfig.KEY)
    private readonly config: ConfigType<typeof orderConfig>
  ) {
    console.log(this.config);
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
}
