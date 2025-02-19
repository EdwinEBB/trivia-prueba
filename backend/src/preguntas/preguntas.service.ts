import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pregunta } from './preguntas.entity';
import { Repository } from 'typeorm';


@Injectable()
export class PreguntasService {

    constructor(
        @InjectRepository(Pregunta)
        private readonly preguntaRepo:Repository<Pregunta>
    ) {}

    async getPreguntasporcatergoria(categoria:string): Promise<Pregunta[]>{
        return this.preguntaRepo.find({where:{categoria}})
    }

    async createPregunta(pregunta:Pregunta): Promise<Pregunta>{
        return this.preguntaRepo.save(pregunta)
    }

}
