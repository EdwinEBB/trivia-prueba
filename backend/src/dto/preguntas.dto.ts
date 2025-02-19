import { IsNotEmpty, IsString, isNotEmpty } from "class-validator";

export class CreatePregutnaDto {
    @IsString()
    @IsNotEmpty()
    enunciado:string;

    @IsString()
    @IsNotEmpty()
    categoria:string;

    @IsString({each:true})
    @IsNotEmpty()
    opciones: string[];

    @IsString()
    @IsNotEmpty()
    respuestacorrecta:string;
}