import { Studant } from "src/studants/entities/studant.entity";

export class Consult {
  id?: string;
  
  agenda: string;
  hora: string;
  alunosId: Studant[];

  createdAt?: string;
  updatedAt?: string;
}
