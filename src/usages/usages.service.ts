import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsageDto } from './dto/create-usage.dto';
import { UpdateUsageDto } from './dto/update-usage.dto';
import { Usages } from 'output/entities/Usages';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Guests } from 'output/entities/Guests';
import { Computers } from 'output/entities/Computers';

@Injectable()
export class UsagesService {
  constructor(
    @InjectRepository(Usages)
    private usagesRepository: Repository<Usages>,
    @InjectRepository(Guests)
    private guestsRepository: Repository<Guests>,
    @InjectRepository(Computers)
    private computersRepository: Repository<Computers>,
  ) {}
  async create(createUsageDto: CreateUsageDto) {
    const guest = await this.guestsRepository.findOne({
      where: { id: createUsageDto.guestId },
    });
    const computer = await this.computersRepository.findOne({
      where: { id: createUsageDto.computerId },
    });
    if (!guest || !computer) {
      throw new NotFoundException(
        '해당 id 게스트 또는 컴퓨터가 존재 하지 않습니다.',
      );
    }
    const usage = this.usagesRepository.create({
      guestId: createUsageDto.guestId,
      computerId: createUsageDto.computerId,
    });
    await this.usagesRepository.save(usage);
    return `${usage.id} 사용 기록이 추가되었습니다.`;
  }

  async findAll() {
    const usages = await this.usagesRepository.find();
    return usages;
  }

  async findOne(id: number) {
    const usage = await this.usagesRepository.findOne({ where: { id } });
    if (!usage) {
      throw new NotFoundException('해당 id 사용 기록이 존재 하지 않습니다.');
    }
    return usage;
  }

  update(id: number, updateUsageDto: UpdateUsageDto) {
    return `This action updates a #${id} usage`;
  }

  remove(id: number) {
    return `This action removes a #${id} usage`;
  }
}
