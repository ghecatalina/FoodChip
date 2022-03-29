import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { ExampleComponent } from './main/example/example.component';
import { ExampleEditorComponent } from './main/example/example-editor/example-editor.component';
import { UsersComponent } from './main/users/users.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'example',
        component: ExampleComponent
      },
      {
        path: 'example/edit/:id',
        component: ExampleEditorComponent
      },
      {
        path: 'example/add',
        component: ExampleEditorComponent
      },
      {
        path: 'users',
        component: UsersComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
