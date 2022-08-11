import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utility/handle-error.utility';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    nome: true,
    email: true,
    cargo: true,
    createdAt: true,
    updatedAt: true,
    senha: false,
  };

  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user
      .findMany({
        select: this.userSelect,
      })
      .catch(handleError);
  }

  async findById(id: string): Promise<User> {
    const record = await this.prisma.user
      .findUnique({
        where: { id },
        select: this.userSelect,
      })
      .catch(handleError);
    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado`);
    }
    return record;
  }

  async findOne(id: string): Promise<User> {
    return this.findById(id).catch(handleError);
  }

  async create(dto: CreateUserDto): Promise<User> {
    if (dto.senha) {
      if (dto.senha != dto.confirmaSenha) {
        throw new BadRequestException('As senhas informadas não são iguais');
      }
    }

    delete dto.confirmaSenha;

    const data: User = {
      nome: dto.nome,
      email: dto.email,
      senha: dto.senha,
      cargo: dto.cargo,
      instituicaoId: dto.instituicaoId,
    };

    return this.prisma.user.create({ data }).catch(handleError);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findById(id);

    if (dto.senha) {
      if (dto.senha != dto.confirmaSenha) {
        throw new BadRequestException('As senhas informadas não são iguais');
      }
    }

    delete dto.confirmaSenha;

    const data: Partial<User> = { ...dto };

    return this.prisma.user
      .update({
        where: { id },
        data,
        select: this.userSelect,
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.user.delete({ where: { id } }).catch(handleError);
  }
}
