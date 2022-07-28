import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtilMovie from '../common/common-test/test-util-movies';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let movieService: MoviesService;

  const mockMovieRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService, {
        provide: getRepositoryToken(Movie),
        useValue: mockMovieRepository
      }],
    }).compile();

    movieService = module.get<MoviesService>(MoviesService);
  });

  beforeEach(() => {
    mockMovieRepository.create.mockReset();
    mockMovieRepository.save.mockReset();
    mockMovieRepository.find.mockReset();
    mockMovieRepository.findOne.mockReset();
    mockMovieRepository.update.mockReset();
    mockMovieRepository.remove.mockReset();
   }); 

  it('should be defined', () => {
    expect(movieService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new movie record and return that', async () => {
      const movie = TestUtilMovie.giveAMeAValidMovie();
      mockMovieRepository.save.mockReturnValue(movie);
      const createCategory = await movieService.create(movie);
      expect(createCategory).toMatchObject(movie);
      expect(mockMovieRepository.save).toBeCalledTimes(1);
    });

    it ('Movie already exists', async () => {
      const movie = TestUtilMovie.giveAMeAValidMovie();
      mockMovieRepository.findOne.mockReturnValue(movie.name);
      expect(movieService.create(movie)).rejects.toBeInstanceOf(HttpException);
      expect(mockMovieRepository.findOne).toHaveBeenCalledTimes(1);
    })
  })
  
  describe('findAll', () => {
    it('should return array movies', async () => {
      const movie = TestUtilMovie.giveAMeAValidMovie();
      mockMovieRepository.find.mockReturnValue([movie, movie]);
      const actors = await movieService.findAll();
      expect(actors).toHaveLength(2);
      expect(mockMovieRepository.find).toHaveBeenCalledTimes(1)
    });
  });
  
  describe('findOne', () => {
    it('should return one movie', async () => {
      const movie = TestUtilMovie.giveAMeAValidMovie();
      mockMovieRepository.findOne.mockReturnValue(movie);
      const oneActor = await movieService.findOne(1);
      expect(oneActor).toMatchObject({name: movie.name});
      expect(mockMovieRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should not return one movie', async () => {
      mockMovieRepository.findOne.mockReturnValue(undefined);
      expect(movieService.findOne(0)).rejects.toBeInstanceOf(HttpException);
      expect(mockMovieRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('Update one movie', async () => {
      const movie = TestUtilMovie.giveAMeAValidMovie();
      mockMovieRepository.findOne.mockReturnValue(movie.id);
      mockMovieRepository.save.mockReturnValue({...movie, name:'Nome atualizado'});
      const updateActor = await movieService.update(1, {...movie, name: 'Nome atualizado'})
      expect(updateActor).toMatchObject({name:'Nome atualizado'});
      expect(mockMovieRepository.findOne).toBeCalledTimes(1);
      expect(mockMovieRepository.save).toBeCalledTimes(1);
    })

    it('should not return one movie', async () => {
      mockMovieRepository.findOne.mockReturnValue(undefined);
      expect(movieService.findOne(0)).rejects.toBeInstanceOf(HttpException);
      expect(mockMovieRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('Should delete a existing movie', async () => {
      const movie = TestUtilMovie.giveAMeAValidMovie();
      mockMovieRepository.findOne.mockReturnValue(movie);
      mockMovieRepository.remove.mockReturnValue(null);
      const deleteActor = await movieService.remove(1);
      expect(deleteActor).toBe(null)
      expect(mockMovieRepository.findOne).toBeCalledTimes(1);
      expect(mockMovieRepository.remove).toBeCalledTimes(1);
      
    })

    it('should not return one movie', async () => {
      mockMovieRepository.findOne.mockReturnValue(undefined);
      expect(movieService.findOne(0)).rejects.toBeInstanceOf(HttpException);
      expect(mockMovieRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
