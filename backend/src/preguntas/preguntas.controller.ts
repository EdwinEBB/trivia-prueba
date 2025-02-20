import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PreguntasService } from './preguntas.service';
import { CreatePregutnaDto, UpdatePreguntaDto } from 'src/dto/preguntas.dto';

@Controller('question')
export class PreguntasController {
  constructor(private readonly preguntasservice: PreguntasService) {}

  @Get('all')
  async getAllPreguntas() {
    return this.preguntasservice.getAllPreguntas();
  }

  @Get()
  async getPreguntaCategoria(@Query('categoria') categoria: string) {
    return this.preguntasservice.getPreguntasporcatergoria(categoria);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async crearpregunta(@Body() createpreguntadto: CreatePregutnaDto) {
    return this.preguntasservice.createPregunta(createpreguntadto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updatepregunta(
    @Param('id') id: number,
    @Body() updatepreguntadto: UpdatePreguntaDto,
  ) {
    return this.preguntasservice.updatePregunta(id, updatepreguntadto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deletepregunta(@Param('id') id: number) {
    return this.preguntasservice.BorrarPregunta(id);
  }
}
