import { Module } from '@nestjs/common';
import { UsagesService } from './usages.service';
import { UsagesController } from './usages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Computers } from 'output/entities/Computers';
import { Guests } from 'output/entities/Guests';
import { Usages } from 'output/entities/Usages';

@Module({
  imports: [TypeOrmModule.forFeature([Usages, Guests, Computers])],
  controllers: [UsagesController],
  providers: [UsagesService],
})
export class UsagesModule {}
