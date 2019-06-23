import { Process } from './Process';
import { Department } from './department';
export interface User {
    id: number;
    name: string;
    avatar: string;
    email: string;
    department: Department;
    process: Process;
    isLeaderDepartment: number;
    isLeaderProcess: number;
    isAdmin: number;
    removed: number;
}
