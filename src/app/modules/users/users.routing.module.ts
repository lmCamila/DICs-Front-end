import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
const appRoutes: Routes = [
    {path: '', component: UsersComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}
