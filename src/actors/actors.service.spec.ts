import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../common/common-test/test-util-actor';
import { ActorsService } from './actors.service';
import { Actor } from './entities/actors.entity';
import { HttpException } from '@nestjs/common';

describe('ActorsService', () => {
  let actorService: ActorsService;

  const mockActorRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActorsService, {
          provide: getRepositoryToken(Actor),
          useValue: mockActorRepository,
        }
      ],
    }).compile();

    actorService = module.get<ActorsService>(ActorsService);
  });

  beforeEach(() => {
    mockActorRepository.create.mockReset();
    mockActorRepository.save.mockReset();
    mockActorRepository.find.mockReset();
    mockActorRepository.findOne.mockReset();
    mockActorRepository.update.mockReset();
    mockActorRepository.delete.mockReset();
  });

  it('should be defined', async () => {
    expect(actorService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new actor record and return that', async () => {
      const actor = TestUtil.giveAMeAValidActor();

      mockActorRepository.create.mockReturnValue(actor);
      mockActorRepository.save.mockReturnValue(actor);

      const createActor = await actorService.create(actor);

      expect(createActor).toMatchObject(actor);

      expect(mockActorRepository.create).toBeCalledTimes(1);
      expect(mockActorRepository.save).toBeCalledTimes(1);
    });

    it('Actor already exists', async () => {
      const actor = TestUtil.giveAMeAValidActor();

      mockActorRepository.findOne.mockReturnValue(actor);

      expect(actorService.create(actor)).rejects.toBeInstanceOf(HttpException);

      expect(mockActorRepository.findOne).toHaveBeenCalledTimes(1);
    })
  })

  describe('findAll', () => {
    it('should return array actors', async () => {
      const actor = TestUtil.giveAMeAValidActor();

      mockActorRepository.find.mockReturnValue([actor, actor]);

      const actors = await actorService.findAll();

      expect(actors).toHaveLength(2);
      expect(mockActorRepository.find).toHaveBeenCalledTimes(1)
    });
  });

  describe('findOne', () => {
    it('should return one actor', async () => {
      const actor = TestUtil.giveAMeAValidActor();
      mockActorRepository.findOne.mockReturnValue(actor);
      const oneActor = await actorService.findOne(1);
      expect(oneActor).toMatchObject({ name: actor.name });
      expect(mockActorRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should not return one actor', async () => {
      mockActorRepository.findOne.mockReturnValue(undefined);
      expect(actorService.findOne(0)).rejects.toBeInstanceOf(HttpException);
      expect(mockActorRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('findActorMovies', () => {
    it('should return one actor with your participation in the movies', async () => {
      const actor: Actor = {
        id: 1, name: 'João', movies: [
          { id: 1, name: 'marley e eu', synopsis: 'filme de cão', author: 'junior', cast: [{ id: 1, name: 'João' }], categories: [{ id: 1, name: 'drama' }] }
        ]
      }
      mockActorRepository.findOne.mockReturnValue(actor);
      const oneActorWithMovies = await actorService.findActorMovies(1);
      expect(oneActorWithMovies).toMatchObject(actor);
      expect(mockActorRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should not return one actor', async () => {
      mockActorRepository.findOne.mockReturnValue(undefined);
      expect(actorService.findOne(0)).rejects.toBeInstanceOf(HttpException);
      expect(mockActorRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('Update one actor', async () => {
      const actor = TestUtil.giveAMeAValidActor();
      mockActorRepository.findOne.mockReturnValue(actor);
      mockActorRepository.update.mockReturnValue({ ...actor, name: 'Nome atualizado' });
      const updateActor = await actorService.update(1, { ...actor, name: 'Nome atualizado' })
      expect(updateActor).toMatchObject({ name: 'Nome atualizado' });
      expect(mockActorRepository.findOne).toBeCalledTimes(1);
      expect(mockActorRepository.update).toBeCalledTimes(1);
    })

    it('should not return one actor', async () => {
      mockActorRepository.findOne.mockReturnValue(undefined);
      expect(actorService.findOne(0)).rejects.toBeInstanceOf(HttpException);
      expect(mockActorRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('Should delete a existing actor', async () => {
      const actor = TestUtil.giveAMeAValidActor();
      mockActorRepository.findOne.mockReturnValue(actor);
      mockActorRepository.delete.mockReturnValue(null);
      const deleteActor = await actorService.remove(1);
      expect(deleteActor).toBe(null)
      expect(mockActorRepository.findOne).toBeCalledTimes(1);
      expect(mockActorRepository.delete).toBeCalledTimes(1);

    })

    it('should not return one actor', async () => {
      mockActorRepository.findOne.mockReturnValue(undefined);
      expect(actorService.findOne(0)).rejects.toBeInstanceOf(HttpException);
      expect(mockActorRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
