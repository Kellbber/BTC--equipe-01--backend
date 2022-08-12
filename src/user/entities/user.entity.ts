import { Institution } from "../../institution/entities/institution.entity";


export class User {
  id?: string;
  name: string;
  email: string;
  role: string;
  institutions?: Institution[];
}
