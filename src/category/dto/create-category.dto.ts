import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateCategoryDto {
    
    @ApiProperty()
    @IsString()
    @Length( 3, 30)
    name: string;

}
