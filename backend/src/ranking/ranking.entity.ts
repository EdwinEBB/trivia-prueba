import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('ranking')
export class Ranking {
  @PrimaryColumn()
  id: number;

  @Column()
  usuarioId: number;

  @Column()
  puntuacion: number;

  @CreateDateColumn()
  createdAt: Date;
}
