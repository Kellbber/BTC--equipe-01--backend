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
}
