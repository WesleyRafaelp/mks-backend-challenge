import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    @Length( 3, 30)
    email: string;

    @ApiProperty()
    @IsString()
    @Length( 4, 30)
    password: string;
}
