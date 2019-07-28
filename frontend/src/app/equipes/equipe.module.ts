
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing-module';
import { BlockUIModule } from 'ng-block-ui';
import { MyMaterialModule } from '../material-module';
import { ListaEquipesComponent } from './lista-equipes/lista-equipes.component';
import { CadEquipeComponent } from './cad-equipe/cad-equipe.component';
import { BottonButtonComponent } from '../shared/bottom/bottom-button.component';

@NgModule({
  declarations: [
    CadEquipeComponent,
    ListaEquipesComponent,
    BottonButtonComponent
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
    CadEquipeComponent,
    ListaEquipesComponent
  ]
})
export class EquipeModule {
}
