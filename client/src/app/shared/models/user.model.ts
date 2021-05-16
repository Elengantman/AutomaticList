import { Role } from '../enums/role.enum';

export interface User {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}
