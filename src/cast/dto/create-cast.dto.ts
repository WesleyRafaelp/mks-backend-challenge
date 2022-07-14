import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateCastDto {

    @ApiProperty()
    @IsString()
    @Length(3, 30)
    name: string;
}
