import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ranking } from './ranking.entity';
import { Repository } from 'typeorm';
import { Server } from 'socket.io';
import { CreateRankingDto } from 'src/dto/ranking.dto';

@Injectable()
export class RankingService {
  private server: Server;
  constructor(
    @InjectRepository(Ranking)
    private readonly rankingRepo: Repository<Ranking>,
  ) {}

  setServer(server: Server) {
    this.server = server;
  }

  async getRanking(): Promise<Ranking[]> {
    return this.rankingRepo.find({ order: { puntuacion: 'DESC' }, take: 10 });
  }

  async agregarpuntaje(createrankingdto: CreateRankingDto): Promise<Ranking> {
    const ranking = this.rankingRepo.create(createrankingdto);
    await this.rankingRepo.save(ranking);

    this.server.emit('rankingupdated', await this.getRanking());

    return ranking;
  }
}
