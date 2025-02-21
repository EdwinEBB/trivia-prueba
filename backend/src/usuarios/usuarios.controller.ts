import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuarioservice:UsuariosService) {}

    @UseGuards(JwtAuthGuard)
    @Get(':nombreusuario')
    async getUsuario(@Param('nombreusuario') nombreusuario:string){
        return this.usuarioservice.BuscarporNombreU(nombreusuario)
    }
}
