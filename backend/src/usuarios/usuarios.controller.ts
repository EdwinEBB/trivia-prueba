import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuarioservice:UsuariosService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get(':nombreusuario')
    async getUsuario(@Param('nombreusuario') nombreusuario:string){
        return this.usuarioservice.BuscarporNombreU(nombreusuario)
    }
}
