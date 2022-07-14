import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { retry } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
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
    return this.categoryRepository.save(createCategoryDto)
  }

  findAll() {
    return this.categoryRepository.query('SELECT * FROM category;');
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
