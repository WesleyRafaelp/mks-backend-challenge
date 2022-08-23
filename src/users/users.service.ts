import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getDataSourceName, InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ){}
  
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: createUserDto.email
      }
    })

    if (user){
      throw new HttpException(`User already registered!`, HttpStatus.CONFLICT);
    }
    
    const createUser = await this.userRepository.create({email: createUserDto.email, password: bcrypt.hashSync(createUserDto.password, 8)})

    const saveUser = await this.userRepository.save(createUser)

    await this.dataSource.queryResultCache.remove(['listUsers'])

    return saveUser
  }

  findAll() {
    return this.userRepository.find({cache: {id: 'listUsers', milliseconds: 100000}});
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({where:{email: email}});

    if(!user){
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    });

    if(!user){
      throw new HttpException(`User ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return await this.userRepository.update(user, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    });

    if(!user){
      throw new HttpException(`User ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return await this.userRepository.delete(user);
  }
}
