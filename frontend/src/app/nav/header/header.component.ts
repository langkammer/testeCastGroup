import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() sidenav: MatSidenav

  logado:boolean = false;

  constructor(
    private _sidenavService: SidenavService
    ) { }

  ngOnInit() {
    this._sidenavService.getLogado().subscribe(
      (logado : boolean) =>{
        if(!logado){
          this.logado = false;
        }
        else{
          this.logado = true; 
        }
      }
    )
  }

  deslogar(){
    console.log("deslogar");
  }
}