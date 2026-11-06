import { Routes } from '@angular/router';
import { HomeComponent } from './componente/home-component/home-component';
import { AcercaComponent } from './componente/acerca-component/acerca-component';
import { Registro } from './componente/registro/registro';
import { UsuarioLista } from './componente/usuario-lista/usuario-lista';
import {Login} from './componente/login/login';
import { IncidenciaCrear } from './componente/incidencia-crear/incidencia-crear';
import { IncidenciaLista } from './componente/incidencia-lista/incidencia-lista';

export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch:'full'},
  {path: 'acerca', component: AcercaComponent},
  {path: 'usuarios-registro', component: Registro},
  {path: 'usuarios-lista', component: UsuarioLista},
  {path: 'incidencia-crear', component: IncidenciaCrear},
  {path: 'mis-incidencias', component: IncidenciaLista},
  {path: 'login', component: Login},
];
