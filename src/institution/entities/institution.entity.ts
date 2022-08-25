<<<<<<< HEAD
import { Studant } from "@prisma/client";

=======
import { Student } from 'src/student/entities/student.entity';
>>>>>>> 20efc7ccae1bd96a9ccbb4e6dff7bc853ef449f7

export class Institution {
  id: string;
  name: string;
  phone: string;
  cep: string;
<<<<<<< HEAD
  numero: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento: string;

  alunosId?: Studant;

  createdAt?: Date;
  updatedAt?: Date;
=======
  adressNumber: string;
  street: string;
  district: string;
  city: string;
  state: string;
  complement?: string;
  students?: Student[];
>>>>>>> 20efc7ccae1bd96a9ccbb4e6dff7bc853ef449f7
}
