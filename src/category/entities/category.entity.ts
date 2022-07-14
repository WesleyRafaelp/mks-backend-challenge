import { Movie } from "src/movies/entities/movie.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('category')
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Movie, movie => movie.categories, { eager: false })
    movies: Movie[];
}
