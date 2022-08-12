import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      include: {
        institutions: true,
      },
    });
  }

  async findById(id: string) {
    const record = await this.prisma.user.findUnique({
      where: { id },
      include: {
        institutions: true,
      },
    });
    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado`);
    }
    return record;
  }

  async findOne(id: string) {
    return this.findById(id);
  }

  async create(dto: CreateUserDto): Promise<User> {
    const data: User = { ...dto };

    return this.prisma.user.create({
      data,
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.findById(id);

    if (dto.instituitionId) {
      let instExist = false;
      user.institutions.map((institution) => {
        if (institution.id === dto.instituitionId) {
          instExist = true;
        }
      });

      if (instExist) {
        return this.prisma.user
          .update({
            where: { id: id },
            data: {
              name: dto.name,
              email: dto.email,
              role: dto.role,
              institutions: {
                disconnect: {
                  id: dto.instituitionId,
                },
              },
            },
            include: {
              institutions: true,
            },
          })
          .catch(this.handleError);
      } else {
        return this.prisma.user
          .update({
            where: { id: id },
            data: {
              name: dto.name,
              email: dto.email,
              role: dto.role,
              institutions: {
                connect: {
                  id: dto.instituitionId,
                },
              },
            },
            include: {
              institutions: true,
            },
          })
          .catch(this.handleError);
      }
    } else {
      return this.prisma.user.update({
        where: { id: id },
        data: {
          name: dto.name,
          email: dto.email,
          role: dto.role,
        },
        include:{
          institutions: true
        }
      });
    }
  }
  async delete(id: string) {
    await this.findById(id);
    await this.prisma.user.delete({ where: { id } });
  }

  handleError(error: Error): undefined {
    //visualização de erro
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    if (!lastErrorLine) {
      console.error(error);
    }

    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro ocorreu ao executar a operação',
    );
  }
}
