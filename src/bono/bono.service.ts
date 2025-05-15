/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BonoEntity } from './bono.entity';


@Injectable()
export class BonoService {
    constructor(
        @InjectRepository(BonoEntity)
        private readonly bonoRepository: Repository<BonoEntity>,
    ) {}

    async crearBono(bono: BonoEntity):Promise<BonoEntity> {
        return await this.bonoRepository.save(bono);
    }


    async findBonoByCodigo(id: string): Promise<BonoEntity> {
        const bono = await this.bonoRepository.findOne({ where: { id } });
        if (!bono) {
            throw new Error('Bono no encontrado');
        }
        return bono;
    }

    async findAllBonosByUsuario(userID: string): Promise<BonoEntity[]> {
        return await this.bonoRepository.find({
            where: { usuario: { id: userID } },
        });
    }
    
    async deleteBono(id: string){
        const bono = await this.bonoRepository.findOne({ where: {id} });
        if(!bono) {
            throw new Error('Bono no encontrado');
        }
        if(bono.calificacion > 4) {
            throw new Error('No se puede eliminar un bono con calificacion mayor a 4');
        }
        await this.bonoRepository.delete(id);
    }
        



    



}

