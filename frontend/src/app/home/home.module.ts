import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing-module';
import { BlockUIModule } from 'ng-block-ui';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule ,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BlockUIModule.forRoot()
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
