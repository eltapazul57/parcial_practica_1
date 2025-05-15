/* eslint-disable prettier/prettier */
import { ClaseEntity } from 'src/clase/clase.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne } from 'typeorm';

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

    //Relacion de bono a clase
    @ManyToOne(() => UsuarioEntity, usuario => usuario.bonos)
    usuario: UsuarioEntity;

    //Relacion de bono a clase
    @ManyToOne(() => ClaseEntity, clase => clase.bonos)
    clase: ClaseEntity;

}
