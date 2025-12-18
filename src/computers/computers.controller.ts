import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComputersService } from './computers.service';
import { CreateComputerDto } from './dto/create-computer.dto';
import { UpdateComputerDto } from './dto/update-computer.dto';

@Controller('computers')
export class ComputersController {
  constructor(private readonly computersService: ComputersService) {}

  @Post()
  async create(@Body() createComputerDto: CreateComputerDto) {
    return this.computersService.create(createComputerDto);
  }

  @Get()
  async findAll() {
    return this.computersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.computersService.findOne(+id);
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.computersService.remove(+id);
  }
}
