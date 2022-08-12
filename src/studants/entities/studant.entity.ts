import { Consult } from "src/consult/entities/consult.entity";
import { Institution } from "src/institution/entities/institution.entity";

export class Studant {
  id?: string;
  nome: string;
  data_nasc: string;
  telefone?: string;
  instituicao?: Institution[];
  createdAt?: Date;
  updatedAt?: Date;
  consultas?: Consult[];
}
