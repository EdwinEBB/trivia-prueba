import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    nombreusuario:string

    @Column()
    contraseña:string
}
