import { Entity,PrimaryColumn, Column } from "typeorm";

@Entity('ranking')
export class Ranking {

    @PrimaryColumn()
    id:number;

    @Column()
    usuarioId:number

    @Column()
    puntuacion:number
}