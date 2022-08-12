import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utility/handle-error.utility';
import { CreateStudantDto } from './dto/create-studant.dto';
import { UpdateStudantDto } from './dto/update-studant.dto';
import { Studant } from './entities/studant.entity';

@Injectable()
export class StudantsService {
  private studantsSelect = {
    id: true,
    name: true,
    birth_date: true,
    fone: true,
    cpf: true,
    cep: true,
    public_place: true,
    district: true,
    city: true,
    state: true,
    url_image: true,
    medical_check: true,
    agMedical_check: true,
    institutionId: true,
  }

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateStudantDto): Promise<Studant> {

    const data: Prisma.StudantCreateInput = {
      name: dto.name,
      birth_date: dto.birth_date,
      fone: dto.fone,
      cpf: dto.cpf,
      cep: dto.cep,
      public_place: dto.public_place,
      district: dto.district,
      city: dto.city,
      state: dto.city,
      url_image: dto.url_image,
      medical_check: dto.medical_check,
      agMedical_check: dto.agMedical_check,
      institution: {
        connect: {
          id: dto.institutionId
        }
      }
    }
    return await this.prisma.studant.create({
      data,
      select: this.studantsSelect }).catch(handleError);
  }

  findAll(): Promise<Studant[]> {
    return this.prisma.studant.findMany({include:{
      institution:{
        select:{
          name: true
        }
      }
    }});
  }

  async findById(id: string): Promise<Studant> {
    const record = await this.prisma.studant.findUnique({ where: { id }, include:{
      institution:{
        select:{
          name: true
        }
      }
    } });
    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado`);
    }
    return record;
  }

  findOne(id: string): Promise<Studant> {
    return this.findById(id);
  }

  async update(id: string, dto: UpdateStudantDto): Promise<Studant> {
    await this.findById(id);

    const data: Partial<Studant> = {
      ...dto
    }
    return this.prisma.studant.update({
      where: { id },
      data,
      select: this.studantsSelect
    }).catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.studant.delete({ where: { id } });
  }
}
