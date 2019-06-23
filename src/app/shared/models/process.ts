import { Department } from './department';
export interface Process {
    id: number;
    department: Department;
    name: string;
    removed: number;
}
