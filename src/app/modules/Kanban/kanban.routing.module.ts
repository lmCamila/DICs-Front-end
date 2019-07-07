import { Routes, RouterModule } from '@angular/router';
import { KanbanComponent } from './kanban/kanban.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const appRoutes: Routes = [
    {path: '', component: KanbanComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})

export class KanbanRoutingModule {}
