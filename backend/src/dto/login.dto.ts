import {IsString } from "class-validator";

export class LoginDto {
    
    @IsString()
    nombreusuario:string;

    @IsString()
    contraseña:string;
}