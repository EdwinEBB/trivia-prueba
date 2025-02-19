import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuarios.entity';
import { HashService } from 'src/Utils/hash/hash.service';
import { UsuariosController } from './usuarios.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Usuario])],
  providers: [UsuariosService, HashService],
  exports:[UsuariosService, TypeOrmModule],
  controllers: [UsuariosController]
})
export class UsuariosModule {}
