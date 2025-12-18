import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Guests } from './entities/guest.entity';

@Injectable()
export class GuestsService {
  constructor(
    @InjectRepository(Guests)
    private guestsRepository: Repository<Guests>,
  ) {}  
  async create(createGuestDto: CreateGuestDto) {
    const guest = this.guestsRepository.create(createGuestDto);
    await this.guestsRepository.save(guest);
    return `${guest.name} 게스트가 추가되었습니다.`;
  }

  async findAll() {
    return await this.guestsRepository.find({relations: ['usages']});
  }

  async findOne(id: number) {
    const guest = await this.guestsRepository.findOne({ where: { id } });
    if (!guest) {
      throw new NotFoundException('해당 id 존재 하지 않습니다.');
    }
    return guest;
  }

  async remove(id: number) {
    const guest = await this.guestsRepository.findOne({ where: { id } });
    if (!guest) {
      throw new NotFoundException('해당 id 존재 하지 않습니다.');
    }
    await this.guestsRepository.delete(id);
    return `${guest.name} 게스트가 삭제되었습니다.`;
  } 
}
