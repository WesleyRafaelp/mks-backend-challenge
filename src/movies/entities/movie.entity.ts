import { Actor } from "../../actors/entities/actors.entity";
import { Category } from "../../category/entities/category.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('movies')
export class Movie {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column()
    synopsis: string;

    @Column({length:50})
    author: string;
    
    @ManyToMany(() => Actor, (actor) => actor.movies, { eager: true, onUpdate:'CASCADE'} )
    @JoinTable()
    cast: Actor[];

    @ManyToMany(() => Category, (category) => category.movies, { eager:true, })
    @JoinTable()
    categories: Category[];

}
