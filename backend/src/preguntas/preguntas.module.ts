import { Module } from '@nestjs/common';
import { PreguntasController } from './preguntas.controller';
import { PreguntasService } from './preguntas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pregunta } from './preguntas.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Pregunta])],
  controllers: [PreguntasController],
  providers: [PreguntasService]
})
export class PreguntasModule {}
