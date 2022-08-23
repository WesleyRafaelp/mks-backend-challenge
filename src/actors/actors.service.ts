import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { Actor } from './entities/actors.entity';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
    private dataSource: DataSource,
  ){}
  
  async create(createActorDto: CreateActorDto) {
    const actor = await this.actorRepository.findOne({where:{ name: createActorDto.name }});
     
    if (actor){
      throw new HttpException(`Actor already registered!`, HttpStatus.CONFLICT);
     }

    const newActor = await this.actorRepository.create(createActorDto);

    const saveActor = await this.actorRepository.save(newActor)

    await this.dataSource.queryResultCache.remove(['listActors'])
    
    return saveActor
  }

  findAll() {
    return this.actorRepository.find({cache: {id: 'listActors', milliseconds: 100000}});
  }

  async findOne(id: number) {
    const actor = await this.actorRepository.findOne({
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
    const actor = await this.actorRepository.findOne({
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

  async update(id: number, updateActorDto: UpdateActorDto) {
    const actor = await this.actorRepository.findOne({
      where: {
        id: id
      }
    });

    if(!actor){
      throw new HttpException(`Actor ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return await this.actorRepository.update(actor, updateActorDto);
  }

  async remove(id: number) {
    const actor = await this.actorRepository.findOne({
      where: {
        id: id
      }
    });

    if(!actor){
      throw new HttpException(`Actor ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return await this.actorRepository.delete(actor);
  }
}
