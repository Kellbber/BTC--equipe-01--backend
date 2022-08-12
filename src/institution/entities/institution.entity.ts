import { Studant } from 'src/studants/entities/studant.entity';
import { User } from 'src/user/entities/user.entity';

export class Institution {
  id: string;
  name: string;
  fone: string;
  cep: string;
  number: string;
  public_place: string;
  district: string;
  city: string;
  state: string;
  complement: string;

  users: User[];
  studants?: Studant[];

}
