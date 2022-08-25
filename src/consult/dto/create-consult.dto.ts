<<<<<<< HEAD
import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateConsultDto {
  @IsString()
  @ApiProperty({
    description: 'Data da consulta',
    example: "20-08-2022"
  })
  agenda: string;

  @IsString()
  @ApiProperty({
    description: 'Hora da consulta',
    example: "10:30"
  })
  hora: string

  @IsString()
  @ApiProperty({
    description: 'Id do aluno',
    example: "colocar o ID"
  })
  alunosId: []
=======
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Consult } from '../entities/consult.entity';

export class CreateConsultDto implements Consult {
  id?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Data das consultas',
    example: '26/05/2022',
  })
  schedule: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Horário das consultas',
    example: '13:00',
  })
  hour: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID do aluno',
    example: 'c20ca255-15b2-489c-ab69-5ed167fb1dd7',
  })
  studentId: string;
>>>>>>> 20efc7ccae1bd96a9ccbb4e6dff7bc853ef449f7
}
