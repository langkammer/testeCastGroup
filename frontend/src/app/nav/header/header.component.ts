import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from 'src/app/services/sidenav.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() sidenav: MatSidenav

  logado:boolean = false;

  constructor(
    private _sidenavService: SidenavService,
    private user:UserService

    ) { }

  ngOnInit() {
    console.log("logar")
    this._sidenavService.getLogado().subscribe((logou: boolean) => {
        if(logou)
          this.logado = true;
        else
          this.logado = false;  
    })
  }

  deslogar(){
    this._sidenavService.deslogar();
    this.user.logout();
    this.logado = this.user.isLogged();
  }
}