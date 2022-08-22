import { Studant } from "@prisma/client";


export class Institution {
  id: string;
  nome: string;
  telefone: string;
  cep: string;
  numero: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento: string;

  alunosId?: Studant;

  createdAt?: Date;
  updatedAt?: Date;
}
