import { Test, TestingModule } from '@nestjs/testing';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import TestUtil from '../common/common-test/test-util-actor';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

const actorMock = TestUtil.giveAMeAValidActor()

describe('ActorsController', () => {
  let actorController: ActorsController;
  let actorService: ActorsService;

  const mockActorRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findActorMovies: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
   }
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActorsController],
      providers: [{
        provide: ActorsService,
        useValue:mockActorRepository
      }],
    }).compile();

    actorController = module.get<ActorsController>(ActorsController);
    actorService = module.get<ActorsService>(ActorsService);
  });

  it('should be defined', () => {
    expect(actorController).toBeDefined();
    expect(actorService).toBeDefined();
  });

  describe('create', () => {
    it('create one actor', async() => {
      const createActorDto : CreateActorDto = {
        name:'João'
      }
      mockActorRepository.create.mockResolvedValue(actorMock)

      const result = await actorController.create(createActorDto);

      expect(result).toEqual(actorMock);
      expect(typeof result).toEqual('object');
      expect(actorService.create).toHaveBeenCalledTimes(1);
      expect(actorService.create).toHaveBeenCalledWith(createActorDto);

    });

    it('should throw an exception', () => {
      const createActorDto : CreateActorDto = {
        name:'João'
      }

      mockActorRepository.create.mockRejectedValueOnce(new Error());

      expect(actorController.create(createActorDto)).rejects.toThrowError();

    });
  });

  describe('findAll', () => {
    it('should return a actors list entity successfully', async() => {
      
      mockActorRepository.findAll.mockResolvedValue(actorMock)

      const result = await actorController.findAll();

      expect(result).toEqual(actorMock);
      expect(typeof result).toEqual('object');
      expect(actorService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {

      mockActorRepository.findAll.mockRejectedValueOnce(new Error());

      expect(actorService.findAll()).rejects.toThrowError();

    });
  });

  describe('findOne', () => {
    it('should return a actor successfully', async() => {
      
      mockActorRepository.findOne.mockResolvedValue(actorMock)

      const result = await actorController.findOne('1');

      expect(result).toEqual(actorMock);
      expect(typeof result).toEqual('object');
      expect(actorService.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {

      mockActorRepository.findOne.mockRejectedValueOnce(new Error());

      expect(actorController.findOne('1')).rejects.toThrowError();

    });
  });

  describe('findActorMovies', () => {
    it('should return a actor with your participation in the movies', async() => {
      
      mockActorRepository.findActorMovies.mockResolvedValue(actorMock)

      const result = await actorController.findActorMovies('1');

      expect(result).toEqual(actorMock);
      expect(typeof result).toEqual('object');
      expect(actorService.findActorMovies).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {

      mockActorRepository.findActorMovies.mockRejectedValueOnce(new Error());

      expect(actorController.findActorMovies('1')).rejects.toThrowError();

    });
  });

  describe('update', () => {
    it('should update one actor', async() => {
      const updateActorDto: UpdateActorDto = {
      name: 'claudio'
      }

      mockActorRepository.update.mockResolvedValue(actorMock)

      const result = await actorController.update('1', updateActorDto);

      expect(result).toEqual(actorMock);
      expect(actorService.update).toHaveBeenCalledTimes(1);
      expect(actorService.update).toHaveBeenCalledWith(1, updateActorDto);
    });
    
    it('should throw an exception', () => {
      const updateActorDto: UpdateActorDto = {
      name: 'claudio'
      }

      mockActorRepository.update.mockRejectedValue(new Error())

      expect(actorController.update('1', updateActorDto)).rejects.toThrowError();
    });
    
  });

  describe('remove', () => {
    it('should remove one actor', async() => {
      
      mockActorRepository.remove.mockResolvedValue(undefined)

      const result = await actorController.remove('1');

      expect(result).toEqual(undefined);
      expect(actorService.remove).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {

      mockActorRepository.remove.mockRejectedValueOnce(new Error());

      expect(actorController.remove('1')).rejects.toThrowError();

    });
  });
});
