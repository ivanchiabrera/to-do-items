import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './views/register/register.component';
import { LoginComponent } from './views/login/login.component';
import { TaskComponent } from './views/task/task.component';
import { UnLoginGuard } from './guards/unlogin.guard';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  {
    path: "",
    redirectTo: "register",
    pathMatch: "full",
    canActivate: [UnLoginGuard],
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [UnLoginGuard],
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [UnLoginGuard],
  },
  {
    path: "task",
    component: TaskComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
