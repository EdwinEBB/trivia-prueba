import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateRankingDto } from 'src/dto/ranking.dto';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingservice: RankingService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async enviarpuntaje(@Body() createrankingdto: CreateRankingDto) {
    return this.rankingservice.agregarpuntaje(createrankingdto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getRankign() {
    return this.rankingservice.getRanking;
  }
}
