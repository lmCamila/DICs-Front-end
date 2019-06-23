import { Department } from './Department';
import { Process } from './Process';

export interface UserUpload {
    id: number;
    name: string;
    avatar: string;
    email: string;
    password: string;
    department: Department;
    process: Process;
    isLeaderDepartment: number;
    isLeaderProcess: number;
    isAdmin: number;
}
