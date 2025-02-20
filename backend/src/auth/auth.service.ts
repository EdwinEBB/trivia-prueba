import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/Utils/hash/hash.service';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioservice:UsuariosService,
        private jwtservice:JwtService,
        private readonly hashservice:HashService
    ){}

    async Login({nombreusuario,contraseña}:LoginDto){
        const usuario= await this.usuarioservice.BuscarporNombreU(nombreusuario)
        if(!usuario){
            throw new UnauthorizedException("Usuario no encontrado")
        }
        const contraextraida=await this.hashservice.CompareContra(contraseña, usuario.contraseña)
        if(!contraextraida){
            throw new UnauthorizedException("Contraseña incorrecta")
        }

        return {token:this.jwtservice.sign({id:usuario.id,nombresuario:usuario.nombreusuario})}
    }

    async register({nombreusuario,contraseña}:RegisterDto){
        const usuarioexist= await this.usuarioservice.BuscarporNombreU(nombreusuario)
        if(usuarioexist){
            throw new BadRequestException('Este usuario ya existe');
        }
        //No es necesario poner el hash acá, porque desde el user.service ya se hace el hash

        await this.usuarioservice.CrearnuevoUS(nombreusuario,contraseña)
        return 'Usuario agregado con exito'
    }
   

    verificarTK(token:string){
        return this.jwtservice.verify(token)
    }
}
