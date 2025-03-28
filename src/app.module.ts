import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { LoggerMiddleware } from './logger.middleware';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsModule } from './groups/groups.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: '192.168.15.7',
    port: 5432,
    username: 'postgres',
    password: 'Arkanes@MI99',
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: false,
  }), EventsModule, UserModule, GroupsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
