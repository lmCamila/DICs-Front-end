import { DicsModel } from './dic-model';
import { HistoryModelDic } from './history-model-dic';
export interface HistoryDicFormat {
    dic: DicsModel;
    history: HistoryModelDic[];
}
