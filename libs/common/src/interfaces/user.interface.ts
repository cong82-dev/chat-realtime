import { UserStatus } from '../constants';

export interface IUser {
  id: string;
  email: string;
  password: string;
  avatarUrl?: string;
  status: UserStatus;
}
