import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUrl } from "class-validator";
import { StringifyOptions } from "querystring";

export class CreateStudantDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do aluno',
    example: 'Alex Faria',
  })
  name: string;

  @IsNumber()
  @ApiProperty({
    description: 'Idade do aluno',
    example: 25,
  })
  birth_date: number;

  @IsString()
  @ApiProperty({
    description: 'Telefone de contato do aluno',
    example: '62921212121',
  })
  fone?: string;

  @IsString()
  @ApiProperty({
    description: 'CPF do aluno',
    example: '00000000000',
  })
  cpf: string;

  @IsString()
  @ApiProperty({
    description: 'CEP de onde o aluno residi',
    example: '74820610',
  })
  cep: string;

  @IsString()
  @ApiProperty({
    description: 'Nome do logradouro onde o aluno residi',
    example: 'Rua José Silva Tavares',
  })
  public_place: string;

  @IsString()
  @ApiProperty({
    description: 'Nome do bairro onde o aluno residi',
    example: 'Lagoinha',
  })
  district: string;

  @IsString()
  @ApiProperty({
    description: 'Nome da cidade onde o aluno residi',
    example: 'Alex Faria',
  })
  city: string;

  @IsString()
  @ApiProperty({
    description: 'Nome do estado onde o aluno residi',
    example: 'São Paulo',
  })
  state: string;

  @IsUrl()
  @ApiProperty({
    description: 'Imagem URL do aluno',
    example: 'https://st2.depositphotos.com/6544740/9337/i/600/depositphotos_93376372-stock-photo-sunset-over-sea-pier.jpg',
  })
  url_image?: string;

  @IsString()
  @ApiProperty({
    description: 'Consultas agendadas para o aluno',
    example: '...',
  })
  medical_check: string;

  @IsString()
  @ApiProperty({
    description: 'Agendar consulta para o aluno',
    example: '...',
  })
  agMedical_check: string;

  @IsString()
  @ApiProperty({
    description: 'Id da instituição onde o aluno estuda',
    example: '2cd197ba-6e81-4ee7-8d65-4f2c321593f0',
  })
  institutionId: string;
}
