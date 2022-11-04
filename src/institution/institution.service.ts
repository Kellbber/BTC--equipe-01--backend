
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { handleError } from 'src/utility/handle-error.utility';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { User } from 'src/user/entities/user.entity';
// import { handleError } from 'src/utility/handle-error.utility';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
<<<<<<< HEAD
import { Institution } from './entities/institution.entity';
=======
// import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { Institution } from './entities/institution.entity';
import { InstitutionRepository } from './institution.repository';
>>>>>>> 20efc7ccae1bd96a9ccbb4e6dff7bc853ef449f7

@Injectable()
export class InstitutionService {
  constructor(private readonly repository: InstitutionRepository) {}

<<<<<<< HEAD
  findAll(): Promise<Institution[]> {
    return this.prisma.institution.findMany();
  }

  async findById(id: string): Promise<Institution> {
    const record = await this.prisma.institution.findUnique({where: {id}})

    if (!record) {
      throw new NotFoundException(`Instituição com o ${id} não encontrado`)
    }
    return record
  }

  async findOne(id: string): Promise<Institution> {
    return this.findById(id)
  }

  async create(dto: CreateInstitutionDto): Promise<Institution> {
    const data: Prisma.InstitutionCreateInput = {
      nome: dto.nome,
      telefone: dto.telefone,
      cep: dto.cep,
      numero: dto.numero,
      logradouro: dto.logradouro,
      bairro: dto.bairro,
      cidade: dto.cidade,
      estado: dto.estado,
      complemento: dto.complemento,
      alunosId: {
        connect: {

        }
      }
    }

    return await this.prisma.institution.create({data})
  }

  async update(id: string, dto: UpdateInstitutionDto): Promise<Institution>  {
    await this.findById(id)

    const data: Partial<Prisma.InstitutionCreateInput> = {
      ...dto,
      alunosId: {
        connect: {
          id: dto.alunosId
        }
      }
    }

    return this.prisma.institution.update({where: {id}, data})
=======
  async create(dto: CreateInstitutionDto): Promise<Institution> {
    return await this.repository.createInstitution(dto).catch(handleError);
  }

  async findAll(): Promise<Institution[]> {
    const institutionExist = await this.repository.findAllInstitution();

    if (institutionExist.length <= 0) {
      throw new BadRequestException('Nenhuma instituição cadastrada');
    }
    return await this.repository.findAllInstitution();
  }

  async findById(id: string): Promise<Institution> {
    const record = await this.repository.findByInstitutionId(id);
    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado`);
    }
    return record;
  }

  async update(id: string, dto: UpdateInstitutionDto): Promise<Institution> {
    await this.repository.findByInstitutionId(id).catch(handleError);

    const data: Partial<Institution> = { ...dto };

    return this.repository.updateInstitution(id, data).catch(handleError);
  }

  async delete(id: string): Promise<Institution> {
    const record = await this.repository
      .deleteInstitution(id)
      .catch(handleError);
    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado`);
    }
    return record;
>>>>>>> 20efc7ccae1bd96a9ccbb4e6dff7bc853ef449f7
  }

  async delete(id:string) {
    await this.findById(id);
    await this.prisma.institution.delete({where: {id}})
  }

  }




