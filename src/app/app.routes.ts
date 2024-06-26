import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';


export const routes: Routes = [
    {path:"home", component: HomeComponent},
    {path:"signin", component: SigninComponent},
    {path:"signup", component: SignupComponent}
];
