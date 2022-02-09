import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { ExcludeNullInterceptor } from './utils/excludeNull.interceptor';
import { FlavorsModule } from './flavors/flavors.module';
import { AllExceptionsFilter } from './utils/exception.filter';
import { CoffeeRepository } from './coffees/coffee.repository';
import { Coffee } from './coffees/entities/coffee.entity';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'tyke.db.elephantsql.com',
      port: 5432,
      username: 'uwmwpfvc',
      password: 'Wutx70Y3KstyqCB9Cm1HKg-olDGLXD_K',
      database: 'uwmwpfvc',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CoffeesModule,
    FlavorsModule,
    PostsModule,
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
