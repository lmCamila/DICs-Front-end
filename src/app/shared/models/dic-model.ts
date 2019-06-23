import { User } from './user';
import { Status } from './status';
import { Period } from './period';
export interface DicsModel {
    id: number;
    user: User;
    status: Status;
    period: Period;
    description: string;
    startDate: Date;
    finishedDate: Date;
    isLate: number;
}
