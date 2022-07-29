import { Test, TestingModule } from '@nestjs/testing';
import TestUtilCategory from '../common/common-test/test-util-category';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

const categoryMockEntity = TestUtilCategory.giveAMeAValidCategory() 

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;

  const mockCategoryRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findCategoryMovies: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
   }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [{
       provide: CategoryService,
      useValue: mockCategoryRepository}],
    }).compile();

    categoryController = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  describe('create', () => {
    it('create one category', async() => {
      const createCategoryDto : CreateCategoryDto = {
        name:'suspense'
      }
      mockCategoryRepository.create.mockResolvedValue(categoryMockEntity)

      const result = await categoryController.create(createCategoryDto);

      expect(result).toEqual(categoryMockEntity);
      expect(typeof result).toEqual('object');
      expect(categoryService.create).toHaveBeenCalledTimes(1);
      expect(categoryService.create).toHaveBeenCalledWith(createCategoryDto);

    });

    it('should throw an exception', () => {
      const createCategoryDto : CreateCategoryDto = {
        name:'suspense'
      }

      mockCategoryRepository.create.mockRejectedValueOnce(new Error());

      expect(categoryController.create(createCategoryDto)).rejects.toThrowError();

    });
  });

  describe('findAll', () => {
    it('should return a categories list entity successfully', async() => {
      
      mockCategoryRepository.findAll.mockResolvedValue(categoryMockEntity)

      const result = await categoryController.findAll();

      expect(result).toEqual(categoryMockEntity);
      expect(typeof result).toEqual('object');
      expect(categoryService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {

      mockCategoryRepository.findAll.mockRejectedValueOnce(new Error());

      expect(categoryService.findAll()).rejects.toThrowError();

    });
  });

  describe('findOne', () => {
    it('should return a category successfully', async() => {
      
      mockCategoryRepository.findOne.mockResolvedValue(categoryMockEntity)

      const result = await categoryController.findOne('1');

      expect(result).toEqual(categoryMockEntity);
      expect(typeof result).toEqual('object');
      expect(categoryService.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {

      mockCategoryRepository.findOne.mockRejectedValueOnce(new Error());

      expect(categoryController.findOne('1')).rejects.toThrowError();

    });
  });

  describe('findCategoryMovies', () => {
    it('should return a category with your participation in the movies', async() => {
      
      mockCategoryRepository.findCategoryMovies.mockResolvedValue(categoryMockEntity)

      const result = await categoryController.findCategoryMovies('1');

      expect(result).toEqual(categoryMockEntity);
      expect(typeof result).toEqual('object');
      expect(categoryService.findCategoryMovies).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {

      mockCategoryRepository.findCategoryMovies.mockRejectedValueOnce(new Error());

      expect(categoryController.findCategoryMovies('1')).rejects.toThrowError();

    });
  });

  describe('update', () => {
    it('should update one category', async() => {
      const updateCategoryDto: UpdateCategoryDto = {
      name: 'terror'
      }

      mockCategoryRepository.update.mockResolvedValue(categoryMockEntity)

      const result = await categoryController.update('1', updateCategoryDto);

      expect(result).toEqual(categoryMockEntity);
      expect(categoryService.update).toHaveBeenCalledTimes(1);
      expect(categoryService.update).toHaveBeenCalledWith(1, updateCategoryDto);
    });
    
    it('should throw an exception', () => {
      const updateCategoryDto: UpdateCategoryDto = {
      name: 'terror'
      }

      mockCategoryRepository.update.mockRejectedValue(new Error())

      expect(categoryController.update('1', updateCategoryDto)).rejects.toThrowError();
    });
    
  });

  describe('remove', () => {
    it('should remove one category', async() => {
      
      mockCategoryRepository.remove.mockResolvedValue(undefined)

      const result = await categoryController.remove('1');

      expect(result).toEqual(undefined);
      expect(categoryService.remove).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {

      mockCategoryRepository.remove.mockRejectedValueOnce(new Error());

      expect(categoryController.remove('1')).rejects.toThrowError();

    });
  });
});
