import { Module } from '@nestjs/common';
import { BuckupService } from './buckup.service';
import { BuckupController } from './buckup.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [BuckupController],
  providers: [BuckupService],
  imports: [ConfigModule.forRoot()],
})
export class BuckupModule {}
