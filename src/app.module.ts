import { Module } from '@nestjs/common';
import { GlobalModule } from './global.module'
import { AppController } from './app.controller';
import { FetchService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(),GlobalModule],
  controllers: [AppController],
  providers: [FetchService],
})

export class AppModule {}
