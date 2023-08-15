import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { ExcludeNullInterceptor } from './utils/excludeNull.interceptor';
import { FlavorsModule } from './flavors/flavors.module';
import { AllExceptionsFilter } from './utils/exception.filter';
import { ConfigModule } from '@nestjs/config';
import { BuckupModule } from './buckup/buckup.module';

@Module({
  imports: [
  /*   TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 5432,
      username: 'mohamed',
      password: '11112222',
      database: 'test',
      autoLoadEntities: true,
      // synchronize: true,
    }), */
   /*  CoffeesModule,
    FlavorsModule,
    PostsModule, */
    BuckupModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ExcludeNullInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
