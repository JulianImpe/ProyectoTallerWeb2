import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import { ProductosComponent } from './pages/productos/productos.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'signup', component:SignupComponent},
    {path:'productos', component:ProductosComponent},
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'**',redirectTo:'login'}
];
