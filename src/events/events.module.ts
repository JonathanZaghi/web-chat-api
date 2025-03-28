import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [UserModule],
  providers: [EventsGateway]
})
export class EventsModule { }
