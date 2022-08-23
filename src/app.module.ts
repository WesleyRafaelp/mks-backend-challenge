import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { ActorModule } from './actors/actors.module';
import { CategoryModule } from './category/category.module';
import { Actor } from './actors/entities/actors.entity';
import { Category } from './category/entities/category.entity';
import { Movie } from './movies/entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { DataSource } from 'typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost', 
    port: 5432,
    cache: {
      type: 'ioredis'
    },
    username: 'root',
    password: 'example',
    database: 'WrVideos',
    entities: [
        Actor, Category, Movie, User
    ],
    synchronize: true,
  }), MoviesModule, CategoryModule, ActorModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
