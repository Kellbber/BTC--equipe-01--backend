import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './student.service';
// import { CreateStudantDto } from './dto/create-studant.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/role.enum';

@ApiTags('students')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('student')
export class StudentsController {
  constructor(private readonly studantsService: StudentsService) {}

  @Roles(Role.ADMIN, Role.BACKOFFICE, Role.CAMPO)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  @ApiOperation({
    summary: 'Cria um novo aluno',
  })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studantsService.create(createStudentDto);
  }

  @Roles(Role.ADMIN, Role.BACKOFFICE, Role.CAMPO)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('find-all')
  @ApiOperation({
    summary: 'Lista todos os alunos cadastrados',
  })
  findAll(@Query('page') page: string) {
    return this.studantsService.findAll(Number(page));
  }

  @Roles(Role.ADMIN, Role.BACKOFFICE, Role.CAMPO)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('find-all-filter')
  @ApiOperation({
    summary:
      'Lista os alunos de forma ordenada filtrando pelo ID da instituição',
  })
  findAllFilter(@Query('page') page: string, @Query('search') search: string) {
    return this.studantsService.findAllFilter(Number(page), String(search));
  }

  @Roles(Role.ADMIN, Role.BACKOFFICE, Role.CAMPO)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get(':id')
  @ApiOperation({
    summary: 'Visualiza um aluno pelo ID',
  })
  findOne(@Param('id') id: string) {
    return this.studantsService.findById(id);
  }

  @Roles(Role.ADMIN, Role.BACKOFFICE, Role.CAMPO)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza um aluno pelo ID',
  })
  update(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.studantsService.update(id, dto);
  }

  @Roles(Role.ADMIN, Role.BACKOFFICE, Role.CAMPO)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deleta um aluno pelo ID',
  })
  delete(@Param('id') id: string) {
    return this.studantsService.delete(id);
  }
}
