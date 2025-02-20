import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRankingDto {

    @IsString()
    @IsNotEmpty()
    usuarioId:number


    @IsNumber()
    @IsNotEmpty()
    puntos:number
}