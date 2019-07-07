import { StructureComponent } from './structure/structure.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const appRoutes: Routes = [
    {path: '', component: StructureComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class StructureRoutingModule {}
