import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCastDto } from './dto/create-cast.dto';
import { UpdateCastDto } from './dto/update-cast.dto';
import { Actor } from './entities/cast.entity';

@Injectable()
export class CastService {
  constructor(
    @Inject('ACTOR_REPOSITORY')
    private castRepository: Repository<Actor>,
  ){}
  
  async create(createCastDto: CreateCastDto) {
    const actor = await this.castRepository.findOne({where:{ name: createCastDto.name }});
     
    if (actor){
      throw new HttpException(`Actor already registered!`, HttpStatus.CONFLICT);
     }
     return this.castRepository.save(createCastDto);
  }

  findAll() {
    return this.castRepository.find();
  }

  async findOne(id: number) {
    const actor = await this.castRepository.findOne({
      where: {
        id: id
      }
    });

    if(!actor){
      throw new HttpException(`Actor ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return actor
  }

  async findActorMovies(id: number){
    const actor = await this.castRepository.findOne({
      where:{
        id: id
      },
      relations: {
        movies: true
      } 
  })

    if(!actor){
      throw new HttpException(`Actor ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return actor
  }

  async update(id: number, updateCastDto: UpdateCastDto) {
    const actor = await this.castRepository.findOne({
      where: {
        id: id
      }
    });

    if(!actor){
      throw new HttpException(`Actor ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return await this.castRepository.update(actor, updateCastDto);
  }

  async remove(id: number) {
    const actor = await this.castRepository.findOne({
      where: {
        id: id
      }
    });

    if(!actor){
      throw new HttpException(`Actor ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return await this.castRepository.delete(actor);
  }
}
