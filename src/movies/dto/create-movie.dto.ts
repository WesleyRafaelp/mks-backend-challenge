import { ApiProperty } from "@nestjs/swagger";
import { INSPECT_MAX_BYTES } from "buffer";
import { IsString, Length } from "class-validator";
import { min } from "rxjs";
import { Actor } from "src/cast/entities/cast.entity";
import { Category } from "src/category/entities/category.entity";

export class CreateMovieDto {
    @ApiProperty()
    @IsString()
    @Length( 3, 30)
    name: string;

    @ApiProperty()
    @IsString()
    @Length( 3, 255)
    synopsis: string;

    @ApiProperty()
    @IsString()
    @Length( 3, 30)
    author: string;

    @ApiProperty({ type: [Actor] })
    cast: Actor[];

    @ApiProperty({ type: [Category] })
    categories: Category[];
}
