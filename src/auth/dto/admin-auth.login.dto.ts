import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class AdminLoginDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
