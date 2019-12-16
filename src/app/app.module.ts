import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { TextoComponent } from './components/texto/texto.component';
import { OperacionesComponent } from './components/operaciones/operaciones.component';
import { IeeeComponent } from './components/ieee/ieee.component';
import { SolucionesComputacionalesComponent } from './components/soluciones-computacionales/soluciones-computacionales.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TextoComponent,
    OperacionesComponent,
    IeeeComponent,
    SolucionesComputacionalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
