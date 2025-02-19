import {Entity, Column, PrimaryColumn} from 'typeorm'

@Entity('preguntas')
export class Pregunta {
    @PrimaryColumn()
    id:number;

    @Column()
    enunciado:string

    @Column()
    categoria:string

    @Column('jsonb')
    opciones:string[];

    @Column()
    respuesta_correcta:string;

}