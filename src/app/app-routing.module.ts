import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRegistrationComponent } from './pages/app-registration/app-registration.component';
import { ApiRegistrationComponent } from './pages/api-registration/api-registration.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';

const routes: Routes = [
  { path: 'app-registration', component: AppRegistrationComponent },
  { path: 'api-registration', component: ApiRegistrationComponent },
  { path: 'user-registration', component: UserRegistrationComponent },
  { path: '', redirectTo: "/app-registration", pathMatch: 'full'},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
