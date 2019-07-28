import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login.component';
import { MyMaterialModule } from '../material-module';
import { BlockUIModule } from 'ng-block-ui';



@NgModule({
    declarations: [LoginComponent],
    imports: [ 
        CommonModule,
        FormsModule ,
        BrowserModule,
        MyMaterialModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BlockUIModule.forRoot()
     ],
     exports : [LoginComponent]
})
export class LoginModule { }

