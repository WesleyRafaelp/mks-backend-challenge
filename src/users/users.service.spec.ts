import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { getConnectionName } from 'ioredis/built/cluster/util';
import { DataSource } from 'typeorm';
import TestUtilUser from '../common/common-test/test-util-users';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let userService: UsersService;
  let dataSource: DataSource;
  
  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,{
        provide: getRepositoryToken(User,'ioredis'),
        useValue: mockUserRepository,
      },],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    dataSource = module.get<DataSource>(DataSource)
  });

  beforeEach(() => {
    mockUserRepository.create.mockReset();
    mockUserRepository.save.mockReset();
    mockUserRepository.find.mockReset();
    mockUserRepository.findOne.mockReset();
    mockUserRepository.remove.mockReset();
    mockUserRepository.update.mockReset();
    mockUserRepository.delete.mockReset();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    //expect(dataSource).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user record and return that', async () => {
      const user = TestUtilUser.giveAMeAValidUser();

      mockUserRepository.create.mockReturnValue(user);
      mockUserRepository.save.mockReturnValue(user);

      const createUser = await userService.create(user);

      expect(createUser).toMatchObject(user);

      expect(mockUserRepository.create).toBeCalledTimes(1);
      expect(mockUserRepository.save).toBeCalledTimes(1);
    });

    it('User already exists', async () => {
      const user = TestUtilUser.giveAMeAValidUser();

      mockUserRepository.findOne.mockReturnValue(user);

      expect(userService.create(user)).rejects.toBeInstanceOf(HttpException);

      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    })
  })

  describe('findAll', () => {
    it('should return array users', async () => {
      const user = TestUtilUser.giveAMeAValidUser();

      mockUserRepository.find.mockReturnValue([user, user]);

      const users = await userService.findAll();

      expect(users).toHaveLength(2);
      expect(mockUserRepository.find).toHaveBeenCalledTimes(1)
    });
  });

  describe('findOne', () => {
    it('should return one user', async () => {
      const user = TestUtilUser.giveAMeAValidUser();
      mockUserRepository.findOne.mockReturnValue(user);
      const oneActor = await userService.findOne('user@gmail.com');
      expect(oneActor).toMatchObject({ email: user.email });
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should not return one user', async () => {
      mockUserRepository.findOne.mockReturnValue(undefined);
      expect(userService.findOne('')).rejects.toBeInstanceOf(HttpException);
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('Update one user', async () => {
      const user = TestUtilUser.giveAMeAValidUser();
      mockUserRepository.findOne.mockReturnValue(user);
      mockUserRepository.update.mockReturnValue({ ...user, email: 'email@gmail.com' });
      const updateActor = await userService.update(1, { ...user, email: 'email@gmail.com' })
      expect(updateActor).toMatchObject({ email: 'email@gmail.com' });
      expect(mockUserRepository.findOne).toBeCalledTimes(1);
      expect(mockUserRepository.update).toBeCalledTimes(1);
    })

    it('should not return one user', async () => {
      mockUserRepository.findOne.mockReturnValue(undefined);
      expect(userService.findOne('')).rejects.toBeInstanceOf(HttpException);
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('Should delete a existing user', async () => {
      const user = TestUtilUser.giveAMeAValidUser();
      mockUserRepository.findOne.mockReturnValue(user);
      mockUserRepository.delete.mockReturnValue(null);
      const deleteActor = await userService.remove(1);
      expect(deleteActor).toBe(null)
      expect(mockUserRepository.findOne).toBeCalledTimes(1);
      expect(mockUserRepository.delete).toBeCalledTimes(1);
    })

    it('should not return one user', async () => {
      mockUserRepository.findOne.mockReturnValue(undefined);
      expect(userService.findOne('')).rejects.toBeInstanceOf(HttpException);
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
