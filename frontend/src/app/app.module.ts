import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav/nav.component';
import { NavBarModule } from './nav/nav.module';
import { LoginModule } from './sigin/login.module';
import { MyMaterialModule } from './material-module';
import { RouterModule } from '@angular/router';
import { BlockUIModule } from 'ng-block-ui';
import { HomeModule } from './home/home.module';
import { FuncionarioModule } from './funcionarios/funcionario.module';
import { FeriasModule } from './ferias/ferias.module';
import { SidenavService } from './services/sidenav.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EquipeModule } from './equipes/equipe.module';
import { UserModule } from './user/user.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './core/request.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    HttpClientModule,
    NavBarModule,
    LoginModule,
    HomeModule,
    UserModule,
    EquipeModule,
    ngfModule,
    BlockUIModule.forRoot()
  ],
  exports : [
    RouterModule,
    LoginModule,
    HomeModule,
    UserModule,
    HttpClientModule,
    FuncionarioModule,
    EquipeModule,
    FeriasModule,
    MyMaterialModule
  ],
  providers: [
    SidenavService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [NavBarComponent]
})
export class AppModule { }
