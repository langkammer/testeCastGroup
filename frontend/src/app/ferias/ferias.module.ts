import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing-module';
import { BlockUIModule } from 'ng-block-ui';
import { MyMaterialModule } from '../material-module';
import { CadFeriasComponent } from './cad-ferias/cad-ferias.component';
import { ListaFeriasComponent } from './lista-ferias/lista-ferias.component';
import { ListaFuncionariosByLimiteComponent } from './lista-funcionarios-by-limite/lista-funcionarios-by-limite.component';
@NgModule({
  declarations: [
    CadFeriasComponent,
    ListaFeriasComponent,
    ListaFuncionariosByLimiteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    AppRoutingModule,
    BlockUIModule.forRoot()
  ],
  exports :[
    CadFeriasComponent,
    ListaFeriasComponent,
    ListaFuncionariosByLimiteComponent
  ]
})
export class FeriasModule {
}
