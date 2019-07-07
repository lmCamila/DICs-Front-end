import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DICsComponent } from './dics/dics.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
const appRoutes: Routes = [
    {path: '', component: DICsComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class DicsRoutingModule {}
