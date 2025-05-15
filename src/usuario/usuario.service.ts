/* eslint-disable prettier/prettier */
import { Injectable,  NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
    ) {}

    async crearUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        const rol = usuario.rol;

        if (rol === 'Profesor') {
            const gruposValidos = ['TICSW', 'IMAGINE', 'COMIT'];
            if (!gruposValidos.includes(usuario.grupoInvestigacion)) {
                throw new Error('Grupo de investigación inválido.');
            }
        } else if (rol === 'Decana') {
            const extensionStr = usuario.extension.toString();
            if (extensionStr.length !== 8) {
                throw new Error('La extensión debe tener exactamente 8 dígitos para una Decana.');
            }
        } else {
            throw new Error('Rol inválido. Solo se permiten "Profesor" o "Decana".');
        }

        return await this.usuarioRepository.save(usuario);
    }

    async findUsuarioById(id: string): Promise<UsuarioEntity> {
        const usuario = await this.usuarioRepository.findOne({ where: { id } });
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        return usuario;
    }

    async eliminarUsuario(id: string): Promise<void> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id },
            relations: ['bonos'],
        });

        if (!usuario) {
            throw new NotFoundException(`Usuario con id ${id} no encontrado.`);
        }

        if (usuario.rol === 'Decana') {
            throw new BadRequestException('No se puede eliminar una usuaria con rol Decana.');
        }

        if (usuario.bonos && usuario.bonos.length > 0) {
            throw new BadRequestException('No se puede eliminar el usuario porque tiene bonos asociados.');
        }

        await this.usuarioRepository.delete(id);
        }


}
