
import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { HomeComponent } from './pages/home/home.component';
import { VerDetalleProductoComponent } from './pages/ver-detalle-producto/ver-detalle-producto.component';

//Podemos cargar todas las rutas en este solo archivo o hacer un routing 
// para cada componente
export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'signup', component:SignupComponent},
    {path:'productos', component:ProductosComponent},
    {path:'home', component:HomeComponent},
    {path:'ver-detalle-producto/:id',component:VerDetalleProductoComponent},
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'**',redirectTo:'home'}
];
