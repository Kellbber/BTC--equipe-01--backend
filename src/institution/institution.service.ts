import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utility/handle-error.utility';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';

@Injectable()
export class InstitutionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateInstitutionDto) {
    if (dto.usersId) {
      const data: Prisma.InstitutionCreateInput = {
        name: dto.name,
        fone: dto.fone,
        cep: dto.cep,
        number: dto.number,
        public_place: dto.public_place,
        district: dto.district,
        city: dto.city,
        state: dto.state,
        complement: dto.complement,
        users: {
          connect: {
            id: dto.usersId,
          },
        },
      };
      return await this.prisma.institution
        .create({
          data,
          include: {
            users: true,
          },
        }).catch(handleError);
    }else{
      return  new NotFoundException("usuário necessário para criação")
    }
  }

  async findAll(user: User) {
    const institutionList = await this.prisma.institution.findMany({
      where: {
        users: {
          every: {
            id: user.id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        fone: true,
        cep: true,
        city: true,
        state: true,
        public_place: true,
        district: true,
        number: true,
        complement: true,
        studants: true,
      },
    });

    if (institutionList.length === 0) {
      throw new NotFoundException(
        'Não existe insituições cadastrados para esse usuário.',
      );
    }
    return institutionList;
  }

  async findById(id: string) {
    const record = await this.prisma.institution.findUnique({
      where: { id },
      include: {
        studants: true,
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string) {
    await this.findById(id);

    return await this.prisma.institution.findUnique({
      where: { id },
      select: {
        name: true,
        fone: true,
        cep: true,
        city: true,
        state: true,
        public_place: true,
        district: true,
        number: true,
        complement: true,
        studants: {
          select: {
            id: true,
            name: true,
            birth_date: true,
            fone: true,
            url_image: true,
            cep: true,
            city: true,
            district: true,
            public_place: true,
            state: true,
            medical_check: true,
          },
        },
      },
    });
  }

  async update(userId: string, id: string, dto: UpdateInstitutionDto) {
    const InstitutionUser = await this.findById(id);

    if (dto.studantsId) {
      let existAluno = false;
      InstitutionUser.studants.map((aluno) => {
        if (aluno.id == dto.studantsId) {
          existAluno = true;
        }
      });

      if (existAluno) {
        return this.prisma.institution
          .update({
            where: { id: id },
            data: {
              name: dto.name,
              fone: dto.fone,
              cep: dto.cep,
              city: dto.city,
              state: dto.state,
              public_place: dto.public_place,
              district: dto.district,
              number: dto.number,
              complement: dto.complement,
              studants: {
                disconnect: {
                  id: dto.studantsId,
                },
              },
            },
            include: {
              studants: true,
            },
          })
          .catch(handleError);
      } else {
        return this.prisma.institution
          .update({
            where: { id: id },
            data: {
              name: dto.name,
              fone: dto.fone,
              cep: dto.cep,
              city: dto.city,
              state: dto.state,
              public_place: dto.public_place,
              district: dto.district,
              number: dto.number,
              complement: dto.complement,
              studants: {
                connect: {
                  id: dto.studantsId,
                },
              },
            },
            include: {
              studants: true,
            },
          })
          .catch(handleError);
      }
    }
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.institution.delete({ where: { id } });
  }
}
