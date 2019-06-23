import { DicsModel } from './dic-model';
import { User } from './user';

export interface UserDics {
    user: User;
    dics: DicsModel[];
}
