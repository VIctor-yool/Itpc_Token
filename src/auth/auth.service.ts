import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepo: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async login(LoginUserDto: LoginUserDto) {
    const user = await this.validateUser(LoginUserDto);
    const token = await this.generateToken();
    return token;
  }

  async validateUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      );
    }
    return user;
  }

  async generateToken() {
    return this.jwtService.sign(
      { name: 'arombake', main: 'mochi' },
      { expiresIn: '2m', secret: 'yum' },
    );
  }

  async createUser(createUserDto: CreateUserDto) {
    // 이메일 중복 체크
    const existingUser = await this.usersRepo.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    // 비밀번호 해시화
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    // 사용자 생성
    const user = this.usersRepo.create({
      email: createUserDto.email,
      password: hashedPassword,
    });

    await this.usersRepo.save(user);
    return `${user.email} 사용자가 추가되었습니다.`;
  }
}
