import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockUIModule } from 'ng-block-ui';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NavBarComponent } from './nav.component';
import { AppRoutingModule } from '../app-routing-module';
import { MyMaterialModule } from '../material-module';
import { HeaderComponent } from './header/header.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { SidenavService } from '../services/sidenav.service';

@NgModule({
    declarations: [
        NavBarComponent,
        HeaderComponent,
        LeftMenuComponent
    ],
    imports: [ 
        CommonModule,
        FormsModule ,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MyMaterialModule,
        FlexLayoutModule,
        BlockUIModule.forRoot()
     ],
     providers: [ SidenavService ]

})
export class NavBarModule { }