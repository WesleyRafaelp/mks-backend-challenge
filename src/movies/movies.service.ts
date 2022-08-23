import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    private dataSource: DataSource,
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

    const saveMovie = await this.movieRepository.save(createMovieDto);

    await this.dataSource.queryResultCache.remove(['listMovies']);

    return saveMovie
  }

  findAll() {
     return this.movieRepository.find({cache: {id: 'listMovies', milliseconds: 100000}});
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

    return await this.movieRepository.remove(movie);
  }
}
