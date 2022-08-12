import { EnumType } from "typescript";


export class User {
  id?: string;
  name: string;
  email: string;
  role: string;
  institutionsId?:string;
}
