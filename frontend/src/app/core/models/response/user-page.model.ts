import { User } from './user.model';

export interface UserPage {
    content?: User[];
    totalElements?: number;
}
