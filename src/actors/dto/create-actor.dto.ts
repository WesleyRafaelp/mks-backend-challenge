import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateActorDto {

    @ApiProperty()
    @IsString()
    @Length(3, 30)
    @IsNotEmpty()
    name: string;
}
