import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { ActorModule } from './actors/actors.module';
import { CategoryModule } from './category/category.module';
import { Actor } from './actors/entities/actors.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category/entities/category.entity';
import { Movie } from './movies/entities/movie.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost', 
    port: 3306,
    username: 'root',
    password: 'example',
    database: 'WrVideos',
    entities: [
        Actor, Category, Movie
    ],
    synchronize: true,
  }), MoviesModule, CategoryModule, ActorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
