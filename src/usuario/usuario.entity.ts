/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne, OneToMany } from 'typeorm';
import { BonoEntity } from '../bono/bono.entity';
import { ClaseEntity } from '../clase/clase.entity';

@Entity()
export class UsuarioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'int'})
    cedula: number;

    @Column()
    nombre: string;

    @Column()
    grupoInvestigacion: string;

    @Column({type: 'int'})
    extension: number;

    @Column()
    rol: string;

    //Relacion de subordinado a jefe
    @ManyToOne(() => UsuarioEntity, (usuario) => usuario.subordinados)
    jefe: UsuarioEntity;
    //Relacion de jefe a subordinados
    @OneToMany(() => UsuarioEntity, (usuario) => usuario.jefe)
    subordinados: UsuarioEntity[];
    //Relacion de usuario a bono
    @OneToMany(() => BonoEntity, bono => bono.usuario)
    bonos: BonoEntity[];
    //Relacion de usuario a clase
    @OneToMany(() => ClaseEntity, clase => clase.usuario)
    clases: ClaseEntity[];
}
