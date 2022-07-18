import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";
import { Actor } from "src/cast/entities/cast.entity";
import { Category } from "src/category/entities/category.entity";

export class CreateMovieDto {
    @ApiProperty()
    @IsString()
    @Length( 3, 30)
    name: string;

    @ApiProperty()
    @IsString()
    @Length( 3, 500)
    synopsis: string;

    @ApiProperty()
    @IsString()
    @Length( 3, 30)
    author: string;

    @ApiProperty({ type: Actor, isArray: true })
    cast: Actor[];

    @ApiProperty({ type: Category, isArray: true })
    categories: Category[];
}
