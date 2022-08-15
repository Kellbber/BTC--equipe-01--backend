import { Body, Controller, Post } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { InstitutionService } from './institution.service';
// import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('institutions')
@Controller('institutions')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria uma nova instituição',
  })
  create(@Body() createInstitutionDto: CreateInstitutionDto) {
    return this.institutionService.create(createInstitutionDto);
  }

  // @Get()
  // @ApiOperation({
  //   summary: 'Lista todas as instituições',
  // })
  // findAll(@LoggedUser() user: User) {
  //   return this.institutionService.findAll(user);
  // }

  // @Get(':id')
  // @ApiOperation({
  //   summary: 'Visualiza uma instituição pelo ID',
  // })
  // findOne(@Param('id') id: string) {
  //   return this.institutionService.findOne(id);
  // }

  // @Patch(':id')
  // @ApiOperation({
  //   summary: 'Atualiza uma instituição pelo ID',
  // })
  // update(
  //   @Param('id')
  //   @Body()
  //   updateInstitutionDto: UpdateInstitutionDto,
  // ) {
  //   return this.institutionService.update(updateInstitutionDto);
  // }

  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // @ApiOperation({
  //   summary: 'Deleta uma instituição pelo ID',
  // })
  // delete(@Param('id') id: string) {
  //   return this.institutionService.delete(id);
  // }
}
