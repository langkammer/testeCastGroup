import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing-module';
import { BlockUIModule } from 'ng-block-ui';
import { CadFuncionarioComponent } from './cad-funcionario/cad-funcionario.component';
import { ListaFuncionariosComponent } from './lista-funcionarios/lista-funcionarios.component';
import { MyMaterialModule } from '../material-module';


@NgModule({
  declarations: [
    CadFuncionarioComponent,
    ListaFuncionariosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule ,
    BrowserModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    AppRoutingModule,
    BlockUIModule.forRoot()
  ],
  exports : [
    CadFuncionarioComponent,
    ListaFuncionariosComponent
  ]
})
export class FuncionarioModule { }
