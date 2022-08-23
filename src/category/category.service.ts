import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private dataSource: DataSource,
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where:{ 
        name: createCategoryDto.name 
      }
    });
     
    if (category){
      throw new HttpException(`Category already registered!`, HttpStatus.CONFLICT);
    }

    const newCategory = await this.categoryRepository.create(createCategoryDto);
    const saveCategory = await this.categoryRepository.save(newCategory);

    await this.dataSource.queryResultCache.remove(['listCategories']);

    return saveCategory
  }

  findAll() {
    return this.categoryRepository.find({cache: {id: 'listCategories', milliseconds: 100000}});
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: id
      }
    });

    if(!category){
      throw new HttpException(`Category ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return category
  }

  async findCategoryMovies(id: number){
    const category = await this.categoryRepository.findOne({
      where:{
        id: id
      },
      relations: {
        movies: true
      }
  })


    if(!category){
      throw new HttpException(`Actor ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: id
      }
    });

    if(!category){
      throw new HttpException(`Category ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return this.categoryRepository.update(category, updateCategoryDto);
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: id
      }
    });

    if(!category){
      throw new HttpException(`Category ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return await this.categoryRepository.delete(category);

  }
}
