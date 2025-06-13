
import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';

//Podemos cargar todas las rutas en este solo archivo o hacer un routing 
// para cada componente
export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'signup', component:SignupComponent},
    {path:'home', loadChildren:()=> import('./pages/home/home.routes').then(h => h.HomeRoutes)},
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'**',redirectTo:'home'}

];
