import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../services/sidenav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  logado:boolean = false;

  constructor(private _sideNavService:SidenavService,
    private router: Router,
    ) { }

  ngOnInit() {
    this._sideNavService.getLogado().subscribe((logado:boolean) =>{
      this.logado = logado;
      if(!logado)
      {
        this.router.navigate(['login'])
      }
    })
  }

}
