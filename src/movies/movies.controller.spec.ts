import { Test, TestingModule } from '@nestjs/testing';
import TestUtilMovie from '../common/common-test/test-util-movies';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

const moviesMockEntity = TestUtilMovie.giveAMeAValidMovie()

describe('MoviesController', () => {
  let moviesController: MoviesController;
  let moviesService: MoviesService;

  const mockMoviesRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
   }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [{
        provide: MoviesService,
        useValue: mockMoviesRepository}],
    }).compile();

    moviesController = module.get<MoviesController>(MoviesController);
    moviesService = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(moviesController).toBeDefined();
    expect(moviesService).toBeDefined();
  });

  describe('create', () => {
    it('create one movie', async() => {
      const createMovieDto : CreateMovieDto = {
        name:'filme',
        synopsis:'filme sobre guerra',
        author:'diretor',
        cast:[{id: 1, name: 'Maria'}],
        categories:[{id:1, name:'suspense'}],
      }
      mockMoviesRepository.create.mockResolvedValue(moviesMockEntity)

      const result = await moviesController.create(createMovieDto);

      expect(result).toEqual(moviesMockEntity);
      expect(typeof result).toEqual('object');
      expect(moviesService.create).toHaveBeenCalledTimes(1);
      expect(moviesService.create).toHaveBeenCalledWith(createMovieDto);

    });

    it('should throw an exception', () => {
      const createMovieDto : CreateMovieDto = {
        name:'filme',
        synopsis:'filme sobre guerra',
        author:'diretor',
        cast:[{id: 1, name: 'Maria'}],
        categories:[{id:1, name:'suspense'}],
      }

      mockMoviesRepository.create.mockRejectedValueOnce(new Error());

      expect(moviesController.create(createMovieDto)).rejects.toThrowError();

    });
  });

  describe('findAll', () => {
    it('should return a movies list entity successfully', async() => {
      
      mockMoviesRepository.findAll.mockResolvedValue(moviesMockEntity)

      const result = await moviesController.findAll();

      expect(result).toEqual(moviesMockEntity);
      expect(typeof result).toEqual('object');
      expect(moviesService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {

      mockMoviesRepository.findAll.mockRejectedValueOnce(new Error());

      expect(moviesService.findAll()).rejects.toThrowError();

    });
  });

  describe('findOne', () => {
    it('should return a movie successfully', async() => {
      
      mockMoviesRepository.findOne.mockResolvedValue(moviesMockEntity)

      const result = await moviesController.findOne('1');

      expect(result).toEqual(moviesMockEntity);
      expect(typeof result).toEqual('object');
      expect(moviesService.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {

      mockMoviesRepository.findOne.mockRejectedValueOnce(new Error());

      expect(moviesController.findOne('1')).rejects.toThrowError();

    });
  });

  describe('update', () => {
    it('should update one movie', async() => {
      const updateMovieDto: UpdateMovieDto = {
      name: 'Livro de Eli'
      }

      mockMoviesRepository.update.mockResolvedValue(moviesMockEntity)

      const result = await moviesController.update('1', updateMovieDto);

      expect(result).toEqual(moviesMockEntity);
      expect(moviesService.update).toHaveBeenCalledTimes(1);
      expect(moviesService.update).toHaveBeenCalledWith(1, updateMovieDto);
    });
    
    it('should throw an exception', () => {
      const updateMovieDto: UpdateMovieDto = {
      name: 'Livro de Eli'
      }

      mockMoviesRepository.update.mockRejectedValue(new Error())

      expect(moviesController.update('1', updateMovieDto)).rejects.toThrowError();
    });
    
  });

  describe('remove', () => {
    it('should remove one movie', async() => {
      
      mockMoviesRepository.remove.mockResolvedValue(undefined)

      const result = await moviesController.remove('1');

      expect(result).toEqual(undefined);
      expect(moviesService.remove).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {

      mockMoviesRepository.remove.mockRejectedValueOnce(new Error());

      expect(moviesController.remove('1')).rejects.toThrowError();

    });
  });
});
