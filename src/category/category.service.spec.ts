import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtilCategory from '../common/common-test/test-util-category';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

describe('CategoryService', () => {
  let categoryService: CategoryService;

  const mockCategoryRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, {
        provide: getRepositoryToken(Category),
        useValue: mockCategoryRepository
      }],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
  });

  beforeEach(() => {
    mockCategoryRepository.create.mockReset();
    mockCategoryRepository.save.mockReset();
    mockCategoryRepository.find.mockReset();
    mockCategoryRepository.findOne.mockReset();
    mockCategoryRepository.update.mockReset();
    mockCategoryRepository.delete.mockReset();
   }); 

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category record and return that', async () => {
      const category = TestUtilCategory.giveAMeAValidCategory();
      mockCategoryRepository.create.mockReturnValue(category);
      mockCategoryRepository.save.mockReturnValue(category);
      const createCategory = await categoryService.create(category);
      expect(createCategory).toMatchObject(category);
      expect(mockCategoryRepository.create).toBeCalledTimes(1);
      expect(mockCategoryRepository.save).toBeCalledTimes(1);
    });

    it ('Category already exists', async () => {
      const category = TestUtilCategory.giveAMeAValidCategory();
      mockCategoryRepository.findOne.mockReturnValue(category.name);
      expect(categoryService.create(category)).rejects.toBeInstanceOf(HttpException);
      expect(mockCategoryRepository.findOne).toHaveBeenCalledTimes(1);
    })
  })
  
  describe('findAll', () => {
    it('should return array categorys', async () => {
      const category = TestUtilCategory.giveAMeAValidCategory();
      mockCategoryRepository.find.mockReturnValue([category, category]);
      const actors = await categoryService.findAll();
      expect(actors).toHaveLength(2);
      expect(mockCategoryRepository.find).toHaveBeenCalledTimes(1)
    });
  });
  
  describe('findOne', () => {
    it('should return one category', async () => {
      const category = TestUtilCategory.giveAMeAValidCategory();
      mockCategoryRepository.findOne.mockReturnValue(category);
      const oneActor = await categoryService.findOne(1);
      expect(oneActor).toMatchObject({name: category.name});
      expect(mockCategoryRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should not return one category', async () => {
      mockCategoryRepository.findOne.mockReturnValue(undefined);
      expect(categoryService.findOne(0)).rejects.toBeInstanceOf(HttpException);
      expect(mockCategoryRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('findCategoryMovies', () => {
    it('should return one actor with your participation in the movies', async () => {
      const category: Category = {id: 1, name: 'drama', movies: [
        { id: 1, name: 'marley e eu', synopsis:'filme de cão', author: 'junior', cast: [{id: 1, name: 'João'}], categories: [ {id: 1, name: 'drama'}] }
      ]}
      mockCategoryRepository.findOne.mockReturnValue(category);
      const oneActorWithMovies = await categoryService.findCategoryMovies(1);
      expect(oneActorWithMovies).toMatchObject(category);
      expect(mockCategoryRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should not return one actor', async () => {
      mockCategoryRepository.findOne.mockReturnValue(undefined);
      expect(categoryService.findOne(0)).rejects.toBeInstanceOf(HttpException);
      expect(mockCategoryRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
  describe('update', () => {
    it('Update one category', async () => {
      const category = TestUtilCategory.giveAMeAValidCategory();
      mockCategoryRepository.findOne.mockReturnValue(category);
      mockCategoryRepository.update.mockReturnValue({...category, name:'Nome atualizado'});
      const updateActor = await categoryService.update(1, {...category, name: 'Nome atualizado'})
      expect(updateActor).toMatchObject({name:'Nome atualizado'});
      expect(mockCategoryRepository.findOne).toBeCalledTimes(1);
      expect(mockCategoryRepository.update).toBeCalledTimes(1);
    })

    it('should not return one category', async () => {
      mockCategoryRepository.findOne.mockReturnValue(undefined);
      expect(categoryService.findOne(0)).rejects.toBeInstanceOf(HttpException);
      expect(mockCategoryRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('Should delete a existing category', async () => {
      const category = TestUtilCategory.giveAMeAValidCategory();
      mockCategoryRepository.findOne.mockReturnValue(category);
      mockCategoryRepository.delete.mockReturnValue(null);
      const deleteActor = await categoryService.remove(1);
      expect(deleteActor).toBe(null)
      expect(mockCategoryRepository.findOne).toBeCalledTimes(1);
      expect(mockCategoryRepository.delete).toBeCalledTimes(1);
      
    })

    it('should not return one category', async () => {
      mockCategoryRepository.findOne.mockReturnValue(undefined);
      expect(categoryService.findOne(0)).rejects.toBeInstanceOf(HttpException);
      expect(mockCategoryRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
