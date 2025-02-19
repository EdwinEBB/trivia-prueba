import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PreguntasService } from './preguntas.service';

@Controller('question')
export class PreguntasController {

    constructor(private readonly preguntasservice:PreguntasService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getPreguntas(@Query('categoria'): categoria:string){
        return this.
    }


}
