import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:"admin",component:EmployeeDashboardComponent},
  {path:"user",component:UserComponent},
  {path:"",component:UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
