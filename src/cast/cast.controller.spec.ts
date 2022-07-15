import { Test, TestingModule } from '@nestjs/testing';
import { CastController } from './cast.controller';
import { CastService } from './cast.service';
import { Actor } from './entities/cast.entity';
import { Movie } from 'src/movies/entities/movie.entity';


describe('CastController', () => {
  let castController: CastController;
  let castService: CastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CastController],
      providers: [{
        provide: CastService,
        useValue:{
          create: jest.fn(),
          findAll: jest.fn(),
          findOne: jest.fn(),
          findActorMovies: jest.fn(),
          update: jest.fn(),
          remove: jest.fn(),
        }
      }],
    }).compile();

    castController = module.get<CastController>(CastController);
    castService = module.get<CastService>(CastService);
  });

  it('should be defined', () => {
    expect(castController).toBeDefined();
    expect(castService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a actors list entity successfully', async() => {
      const result = await castController.findAll();

      expect(result);
      expect(typeof result).toEqual('object');
    });
  });
});
