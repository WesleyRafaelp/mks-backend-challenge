import { Actor } from "src/cast/entities/cast.entity";
import { Category } from "src/category/entities/category.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('movies')
export class Movie {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    synopsis: string;

    @Column()
    author: string;

    @ManyToMany(() => Actor, (actor) => actor.movies)
    @JoinTable()
    cast: Actor[];

    @ManyToMany(() => Category, (category) => category.movies)
    @JoinTable()
    categories: Category[];

    
}
