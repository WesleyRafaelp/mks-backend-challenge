import { Movie } from "../../movies/entities/movie.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('category')
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 30})
    name: string;

    @ManyToMany(type => Movie, movie => movie.categories, {onUpdate:'CASCADE'})
    movies?: Movie[];

}

