import { IsNotEmpty, IsNumber } from "class-validator";

export class updatePuntaje {

    @IsNumber()
    @IsNotEmpty()
    usuarioId:number


    @IsNumber()
    @IsNotEmpty()
    puntos:number
}