import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TextoComponent } from './components/texto/texto.component';
import { OperacionesComponent } from './components/operaciones/operaciones.component';
import { SolucionesComputacionalesComponent } from './components/soluciones-computacionales/soluciones-computacionales.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'Inicio', component:HomeComponent},
  {path: 'Texto-binario', component:TextoComponent},
  {path: 'OperacionesBasicas', component:OperacionesComponent},
  {path: 'SolucionesComputacionales', component: SolucionesComputacionalesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
