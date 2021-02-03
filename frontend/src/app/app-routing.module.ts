import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './views/register/register.component';
import { LoginComponent } from './views/login/login.component';
import { TaskComponent } from './views/task/task.component';
import { UnLoginGuard } from './guards/unlogin.guard';
import { LoginGuard } from './guards/login.guard';
import { FolderComponent } from './views/folder/folder.component';


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
    path: "task/:id",
    component: TaskComponent,
    canActivate: [LoginGuard],
  },
  {
    path: "folder",
    component: FolderComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
