import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComputerDto } from './dto/create-computer.dto';
import { UpdateComputerDto } from './dto/update-computer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Computers } from 'output/entities/Computers';

@Injectable()
export class ComputersService {
  constructor(
    @InjectRepository(Computers)
    private computersRepository: Repository<Computers>,
  ) {}
  async create(createComputerDto: CreateComputerDto) {
    const computer = this.computersRepository.create(createComputerDto);
    await this.computersRepository.save(computer);
    return `${computer.id} 컴퓨터가 추가되었습니다.`;
  }

  async findAll() {
    const computers = await this.computersRepository.find();
    return computers;
  }

  async findOne(id: number) {
    const computer = await this.computersRepository.findOne({ where: { id } });
    if (!computer) {
      throw new NotFoundException('해당 id 존재 하지 않습니다.');
    }
    return computer;
  }


  async remove(id: number) {
    const computer = await this.computersRepository.findOne({ where: { id } });
    if (!computer) {
      throw new NotFoundException('해당 id 존재 하지 않습니다.');
    }
    await this.computersRepository.delete(id);
    return `${computer.id} 컴퓨터가 삭제되었습니다.`;
  }
}
