import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbt } from 'db/db-fuente';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { PreguntasModule } from './preguntas/preguntas.module';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dbt),
    AuthModule,
    UsuariosModule,
    PreguntasModule,
    RankingModule,
  ],
})
export class AppModule {}
