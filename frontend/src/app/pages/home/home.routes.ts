import { Component } from "@angular/core";
import { Routes } from "@angular/router";
import path from "path";
import { HomeComponent } from "./home.component";

export const HomeRoutes: Routes = [
{
    path:'',
        component: HomeComponent//Hacemos esto con cada funcionalidad que tenga el componente
        //Por ejemplo, si tenemos que hacer una lista o crearlo,etc.
        //path:'',
    //children:[
      //  {
        //path:'home',
        //detailProductos o updateProductos
        //component: buscarProductos/:id (Agregamos el id para que sea dinamico)//Hacemos esto con cada funcionalidad que tenga el componente
        //Por ejemplo, si tenemos que hacer una lista o crearlo,etc.
        //},
    
}
]