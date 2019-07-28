import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './sigin/login.component';
import { HomeComponent } from './home/home.component';
import { ListaFuncionariosComponent } from './funcionarios/lista-funcionarios/lista-funcionarios.component';
import { ListaFeriasComponent } from './ferias/lista-ferias/lista-ferias.component';
import { ListaEquipesComponent } from './equipes/lista-equipes/lista-equipes.component';
import { AuthGuard } from './core/auth.guard';
import { UserComponent } from './user/user.component';



const routes: Routes = [
    { 
        path: 'home',
        component: HomeComponent
    },
    { 
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'equipes',
        component: ListaEquipesComponent
    },
    { 
        path: 'funcionarios',
        component: ListaFuncionariosComponent
    },
    { 
        path: 'ferias',
        component: ListaFeriasComponent
    },
    { 
        path: 'user',
        component: UserComponent
    }          
];

@NgModule({
    imports: [ 
        RouterModule.forRoot(routes) 
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
