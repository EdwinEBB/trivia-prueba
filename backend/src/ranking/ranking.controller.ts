import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateRankingDto } from 'src/dto/ranking.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingservice: RankingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async enviarpuntaje(@Body() createrankingdto: CreateRankingDto) {
    return this.rankingservice.agregarpuntaje(createrankingdto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getRankign() {
    return this.rankingservice.getRanking;
  }
}
