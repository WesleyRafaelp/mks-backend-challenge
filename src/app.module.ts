import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { CastModule } from './cast/cast.module';
import { CategoryModule } from './category/category.module';
import { CastController } from './cast/cast.controller';
import { CategoryController } from './category/category.controller';
import { MoviesController } from './movies/movies.controller';
import { CastService } from './cast/cast.service';
import { CategoryService } from './category/category.service';
import { MoviesService } from './movies/movies.service';
import { castProviders } from './cast/cast.providers';
import { categoryProviders } from './category/category.providers';
import { movieProviders } from './movies/movies.providers';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [DatabaseModule, MoviesModule, CastModule, CategoryModule],
  controllers: [CastController, CategoryController, MoviesController],
  providers: [CastService, CategoryService, MoviesService, ...castProviders, 
  ...categoryProviders, ...movieProviders],
})
export class AppModule {}
