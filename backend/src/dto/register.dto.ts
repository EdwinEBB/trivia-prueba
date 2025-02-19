import {IsString, minLength, MinLength} from "class-validator";

export class RegisterDto {
    
    @IsString()
    @MinLength(1)
    nombreusuario:string;

    @IsString()
    @MinLength(8)
    contraseña:string
}