import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComputersModule } from './computers/computers.module';
import { GuestsModule } from './guests/guests.module';
import { StaffsModule } from './staffs/staffs.module';
import { UsagesModule } from './usages/usages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guests } from './guests/entities/guest.entity';
import { Staffs } from './staffs/entities/staff.entity';
import { Usages } from './usages/entities/usage.entity';
import { Computers } from './computers/entities/computer.entity';
import { Users } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [    
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "127.0.0.1",
      port: 3306,
      username: "root",
      password: "1234",
      database: "itpc",
      entities: [Guests, Staffs, Usages, Computers, Users],
    }),
    GuestsModule,
    StaffsModule,
    UsagesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
