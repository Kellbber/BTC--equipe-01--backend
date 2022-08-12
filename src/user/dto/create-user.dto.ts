import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, IsString, Matches, MinLength } from "class-validator";
import { EnumType } from "typescript";

export class CreateUserDto {

  @IsString()
  @ApiProperty({
    description: 'Nome completo',
    example: "Alex Faria"
  })
  name: string;

  @IsString()
  @Matches(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,{
    message: "escreva um email valido"
  })
  @ApiProperty({
    description: 'Email para cadastro',
    example: "alexcaras1@hotmail.com"
  })
  email: string

  @IsString()
  @ApiProperty({
    description: 'Cargo',
    example: "campo"
  })
  role: string;

  instituitionId?: string
}
