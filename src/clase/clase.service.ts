/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClaseEntity } from './clase.entity';


@Injectable()
export class ClaseService {
    constructor(
        @InjectRepository(ClaseEntity)
        private readonly claseRepository: Repository<ClaseEntity>,
    ){}

    async crearClase(clase: ClaseEntity): Promise<ClaseEntity>{
        const codigo = clase.codigo;
        if (codigo.length !== 10){
            throw new Error('El código debe de tener 10 caracteres')
        }
        return await this.claseRepository.save(clase)  
    }

    async findClaseById(id:string): Promise <ClaseEntity>{
        const clase = await this.claseRepository.findOne({where: {id}});
        if (!clase){
            throw new Error('Clase no encontrada')
        }
        return clase;
    }
}
