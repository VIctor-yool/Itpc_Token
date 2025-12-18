import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staffs } from 'output/entities/Staffs';

@Module({
  imports: [TypeOrmModule.forFeature([Staffs])],
  controllers: [StaffsController],
  providers: [StaffsService],
})
export class StaffsModule {}
