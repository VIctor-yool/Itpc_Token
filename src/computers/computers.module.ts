import { Module } from '@nestjs/common';
import { ComputersService } from './computers.service';
import { ComputersController } from './computers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Computers } from 'output/entities/Computers';

@Module({
  imports: [TypeOrmModule.forFeature([Computers])],
  controllers: [ComputersController],
  providers: [ComputersService],
})
export class ComputersModule {}
