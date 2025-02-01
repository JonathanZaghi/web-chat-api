import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { LoggerMiddleware } from './logger.middleware';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [EventsModule, UserModule],
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
