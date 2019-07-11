import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
const appRoutes: Routes = [
    {path: 'structure', loadChildren: () => import('./modules/structure/structure.module').then(m => m.StructureModule)},
    {path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)},
    {path: 'dics', loadChildren: () => import('./modules/dics/dics.module').then(m => m.DicsModule)},
    {path: 'kanban', loadChildren: () => import('./modules/kanban/kanban.module').then(m => m.KanbanModule)},
    // {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
