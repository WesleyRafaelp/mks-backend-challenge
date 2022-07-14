import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @Inject('MOVIE_REPOSITORY')
    private movieRepository: Repository<Movie>,
  ){}
  
  async create(createMovieDto: CreateMovieDto) {
    const movie = await this.movieRepository.findOne({
      where:{ 
        name: createMovieDto.name 
      }
    });
     
    if (movie){
      throw new HttpException(`Movie already registered!`, HttpStatus.CONFLICT);
     }
    return this.movieRepository.save(createMovieDto);
  }

  findAll() {
     return this.movieRepository.find()
  }

  async findOne(id: number) {
    const movie = await this.movieRepository.findOne({
      where: {
        id: id
      }
    });

    if(!movie){
      throw new HttpException(`Movie ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOne({
      where: {
        id: id
      }
    });

    console.log(movie, 'movie')
    if(!movie){
      throw new HttpException(`Movie ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    const movieUpdated = {...movie, ...updateMovieDto}
    return await this.movieRepository.save(movieUpdated)
  }

  async remove(id: number) {
    const movie = await this.movieRepository.findOne({
      where: {
        id: id
      }
    });

    if(!movie){
      throw new HttpException(`Movie ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    await this.movieRepository.remove(movie);
  }
}
