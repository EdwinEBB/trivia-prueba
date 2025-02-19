import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ranking } from './ranking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RankingService {

    constructor(
        @InjectRepository(Ranking)
        private readonly rankingRepo:Repository<Ranking>,
    ) {}


    async getRanking():Promise<Ranking[]>{
        return this.rankingRepo.find({order:{puntuacion:'DESC'}})
    }

    async updatePuntuacion(usuarioId:number, puntos:number): Promise<Ranking> {

        let ranking=await this.rankingRepo.findOne({where:{usuarioId}})

        if(!ranking){
            ranking= this.rankingRepo.create({usuarioId,puntuacion:puntos})
        }else{
            ranking.puntuacion += puntos;
        }


        return this.rankingRepo.save(ranking);


    }
}
