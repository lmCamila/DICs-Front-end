import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const appRoutes: Routes = [
    {path: 'process', component: DepartmentComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class DepartmentRoutingModule {}
