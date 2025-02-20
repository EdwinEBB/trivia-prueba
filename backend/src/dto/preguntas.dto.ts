import { IsNotEmpty, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
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


export class UpdatePreguntaDto extends PartialType(CreatePregutnaDto) {}