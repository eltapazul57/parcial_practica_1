/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BonoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'int'})
    monto: number;

    @Column({type: 'double'})
    calificacion: number;

    @Column()
    palabraClave: string;

}
