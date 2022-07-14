import { Movie } from "src/movies/entities/movie.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Actor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Movie, movie => movie.cast, { eager: false })
    movies: Movie[]

}
