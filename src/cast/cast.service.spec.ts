import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { DataSource, Repository } from 'typeorm';
import { castProviders } from './cast.providers';
import { CastService } from './cast.service';
import { Actor } from './entities/cast.entity';
import { HttpException } from '@nestjs/common';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

describe('CastService', () => {
  let castService: CastService;
  let repositoryMock: MockType<Repository<Actor>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ],
      providers: [
        CastService,
        {
          provide: 'ACTOR_REPOSITORY',
          useValue: getRepositoryToken(Actor),
          useClass: Repository,
          useFactory: (dataSource: DataSource) => repositoryMock,
          inject: ['DATA_SOURCE'],
        }
      ],
    }).compile();

    castService = module.get<CastService>(CastService);
    repositoryMock = module.get('ACTOR_REPOSITORY');
    console.log(repositoryMock);
  });

  it('should be defined', async () => {
    expect(castService).toBeDefined();
  });

  it('should return array actors', async () => {
    repositoryMock.find.mockReturnValue([]);
    const actors = await castService.findAll();
    expect(actors).toBeInstanceOf(Array);
  });

  it('should return one actor', async () => {
    repositoryMock.findOne.mockReturnValue(Actor);
    const actor = await castService.findOne(15);
    expect(actor).toBeInstanceOf(Actor);
  });

  it('should not return one actor', async () => {
    try {
      repositoryMock.findOne.mockReturnValue(undefined);
      await castService.findOne(0);
    } catch (error) {
      expect(error).not.toBeInstanceOf(Actor);
    }
  });

  it('should not return one actor', async () => {
    repositoryMock.findOne.mockReturnValue(undefined);
    repositoryMock.save.mockReturnValue(Actor);
    const actor = await castService.create({ name:'rodolfa'});
    expect(actor).toBeInstanceOf(Actor);
  });
});
