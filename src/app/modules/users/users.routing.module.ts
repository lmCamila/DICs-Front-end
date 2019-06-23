import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
const appRoutes: Routes = [
    {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}
