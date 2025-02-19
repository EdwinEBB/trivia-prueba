import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuarios.entity';
import { HashService } from 'src/Utils/hash/hash.service';

@Injectable()
export class UsuariosService {

    constructor(
        private readonly hashservice:HashService,
        @InjectRepository(Usuario)
        private usuarioRepo: Repository<Usuario>
    ) {}

    async BuscarporNombreU(Nombreusario:string): Promise<Usuario | null> {
        return this.usuarioRepo.findOne({where:{nombreusuario:Nombreusario}})
    }


    async CrearnuevoUS(nombreusuario:string,contraseña:string): Promise<any> {
        const HashContraseña= await this.hashservice.HashContra(contraseña)
        const usuario= this.usuarioRepo.save({nombreusuario, contraseña:HashContraseña})
        return usuario
    }


}
