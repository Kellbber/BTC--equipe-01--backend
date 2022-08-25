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
} from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { InstitutionService } from './institution.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateInstitutionDto } from './dto/update-institution.dto';

@ApiTags('institutions')
@Controller('institutions')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria uma nova instituição',
  })
<<<<<<< HEAD
  create(
    @Body() createInstitutionDto: CreateInstitutionDto,
  ) {
=======
  create(@Body() createInstitutionDto: CreateInstitutionDto) {
>>>>>>> 20efc7ccae1bd96a9ccbb4e6dff7bc853ef449f7
    return this.institutionService.create(createInstitutionDto);
  }

  @Get('find-all')
  @ApiOperation({
    summary: 'Lista todas as instituições',
  })
<<<<<<< HEAD
  findAll(@LoggedUser() user: User) {
    return this.institutionService.findAll( );
=======
  findAll() {
    return this.institutionService.findAll();
>>>>>>> 20efc7ccae1bd96a9ccbb4e6dff7bc853ef449f7
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualiza uma instituição pelo ID',
  })
  findOne(@Param('id') id: string) {
    return this.institutionService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza uma instituição pelo ID',
  })
  update(
    @Param('id') id: string,
    @Body()
    dto: UpdateInstitutionDto,
  ) {
<<<<<<< HEAD
    return this.institutionService.update(id, updateInstitutionDto);
=======
    return this.institutionService.update(id, dto);
>>>>>>> 20efc7ccae1bd96a9ccbb4e6dff7bc853ef449f7
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deleta uma instituição pelo ID',
  })
  delete(@Param('id') id: string) {
    return this.institutionService.delete(id);
  }
}
