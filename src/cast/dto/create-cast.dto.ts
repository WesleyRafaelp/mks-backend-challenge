import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCastDto {

    @ApiProperty()
    @IsString()
    @Length(3, 30)
    @IsNotEmpty()
    name: string;
}
