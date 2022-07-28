import { Movie } from "../../movies/entities/movie.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('actor')
export class Actor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    name: string;

    @ManyToMany(type => Movie, movie => movie.cast,{onUpdate:'CASCADE'})
    movies?: Movie[];

}
