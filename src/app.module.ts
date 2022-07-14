import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { CastModule } from './cast/cast.module';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [MoviesModule, CastModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
