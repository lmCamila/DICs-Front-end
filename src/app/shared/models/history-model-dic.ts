import { Status } from './status';

export interface HistoryModelDic {
    id: number;
    idDic: number;
    statusDic: Status;
    note: string;
    type: string;
}
