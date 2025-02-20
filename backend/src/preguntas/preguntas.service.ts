import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pregunta } from './preguntas.entity';
import { Repository } from 'typeorm';
import { CreatePregutnaDto, UpdatePreguntaDto } from 'src/dto/preguntas.dto';

@Injectable()
export class PreguntasService {
  constructor(
    @InjectRepository(Pregunta)
    private readonly preguntaRepo: Repository<Pregunta>,
  ) {}

  async getAllPreguntas(): Promise<Pregunta[]> {
    return this.preguntaRepo.find();
  }

  async getPreguntasporcatergoria(categoria: string): Promise<Pregunta[]> {
    return this.preguntaRepo.find({ where: { categoria } });
  }

  async createPregunta(
    creaatepreguntadto: CreatePregutnaDto,
  ): Promise<Pregunta> {
    const newpregunta = this.preguntaRepo.create(creaatepreguntadto);
    return await this.preguntaRepo.save(newpregunta);
  }

  async updatePregunta(
    id: number,
    UpdatePreguntadto: UpdatePreguntaDto,
  ): Promise<Pregunta> {
    await this.preguntaRepo.update(id, UpdatePreguntadto);
    const preguntaactualizada = await this.preguntaRepo.findOne({
      where: { id },
    });
    if (!preguntaactualizada) {
      throw new Error(`La pregunta con id: ${id} no fue encontrada`);
    }
    return preguntaactualizada;
  }

  async BorrarPregunta(id: number): Promise<void> {
    await this.preguntaRepo.delete(id);
  }
}
