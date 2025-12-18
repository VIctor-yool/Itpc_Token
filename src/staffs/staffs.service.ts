import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Repository } from 'typeorm';
import { Staffs } from './entities/staff.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(Staffs)
    private staffsRepository: Repository<Staffs>,
  ) {}
  async create(createStaffDto: CreateStaffDto) {
    const staff = this.staffsRepository.create(createStaffDto);
    await this.staffsRepository.save(staff);
    return `${staff.name} 직원이 추가되었습니다.`;
  }

  async findAll() {
    const staffs = await this.staffsRepository.find();
    return staffs;
  }

  async findOne(id: number) {
    const staff = await this.staffsRepository.findOne({ where: { id } });
    if (!staff) {
      throw new NotFoundException('해당 id 존재 하지 않습니다.');
    }
    return staff;
  }


  async remove(id: number) {
    const staff = await this.staffsRepository.findOne({ where: { id } });
    if (!staff) {
      throw new NotFoundException('해당 id 존재 하지 않습니다.');
    }
    await this.staffsRepository.remove(staff);
    return `${staff.name} 직원이 삭제되었습니다.`;
  }
}
