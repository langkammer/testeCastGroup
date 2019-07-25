import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SiginComponent } from './sigin/sigin.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { CadEquipeComponent } from './cad-equipe/cad-equipe.component';
import { CadFuncionarioComponent } from './cad-funcionario/cad-funcionario.component';
import { CadFeriasComponent } from './cad-ferias/cad-ferias.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { EquipesComponent } from './equipes/equipes.component';
import { ListarFeriasComponent } from './listar-ferias/listar-ferias.component';
import { ListaFeriasComponent } from './lista-ferias/lista-ferias.component';
import { ListaEquipesComponent } from './lista-equipes/lista-equipes.component';
import { ListaFuncionariosComponent } from './lista-funcionarios/lista-funcionarios.component';
import { ListaFuncionariosByLimiteComponent } from './lista-funcionarios-by-limite/lista-funcionarios-by-limite.component';

@NgModule({
  declarations: [
    AppComponent,
    SiginComponent,
    HomeComponent,
    NavComponent,
    CadEquipeComponent,
    CadFuncionarioComponent,
    CadFeriasComponent,
    FuncionariosComponent,
    EquipesComponent,
    ListarFeriasComponent,
    ListaFeriasComponent,
    ListaEquipesComponent,
    ListaFuncionariosComponent,
    ListaFuncionariosByLimiteComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
