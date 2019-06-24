import { KanbanComponent } from './kanban/kanban.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DICsComponent } from './dics/dics.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
const appRoutes: Routes = [
    {path: 'dics', component: DICsComponent, canActivate: [AuthGuard]},
    {path: 'kanban', component: KanbanComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class DicsRoutingModule {}
