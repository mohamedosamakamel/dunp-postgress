import { Controller, Post, Get } from '@nestjs/common';
import { BuckupService } from './buckup.service';

@Controller('buckup')
export class BuckupController {
  constructor(private readonly buckupService: BuckupService) {}

  @Get('/')
  async buckup() {
    return await this.buckupService.DumpPostgress();
  }
  @Get('/restore')
  async restore() {
    return await this.buckupService.restorePostgress();
  }
}
