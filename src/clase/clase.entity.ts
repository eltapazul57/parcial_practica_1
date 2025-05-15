/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne, OneToMany } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { BonoEntity } from '../bono/bono.entity';

@Entity()
export class ClaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    codigo: string;

    @Column({type: 'int'})
    creditos: number;

    //Relacion de clase a usuario
    @ManyToOne(() => UsuarioEntity, usuario => usuario.clases)
    usuario: UsuarioEntity;

    //Relacion de clase a bono
    @OneToMany(() => BonoEntity, bono => bono.clase)
    bonos: BonoEntity[];





}
