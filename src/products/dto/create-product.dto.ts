import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsPositive()
    price: number;

    @IsInt()
    @IsPositive()
    count: number;

    @IsInt()
    @IsPositive()
    productTypeId: number;
}
