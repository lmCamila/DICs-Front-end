import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessComponent } from './process/process.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
const appRoutes: Routes = [
    {path: 'process', component: ProcessComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class ProcessRoutingModule {}
