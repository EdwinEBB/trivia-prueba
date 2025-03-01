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
import { PreguntasService } from './preguntas.service';
import { CreatePregutnaDto, UpdatePreguntaDto } from 'src/dto/preguntas.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';

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
  @UseGuards(JwtAuthGuard)
  async crearpregunta(@Body() createpreguntadto: CreatePregutnaDto) {
    return this.preguntasservice.createPregunta(createpreguntadto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updatepregunta(
    @Param('id') id: number,
    @Body() updatepreguntadto: UpdatePreguntaDto,
  ) {
    return this.preguntasservice.updatePregunta(id, updatepreguntadto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletepregunta(@Param('id') id: number) {
    return this.preguntasservice.BorrarPregunta(id);
  }
}
