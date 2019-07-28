import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsgService } from 'src/app/core/msg.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lista-funcionarios',
  templateUrl: './lista-funcionarios.component.html',
  styleUrls: ['./lista-funcionarios.component.css']
})
export class ListaFuncionariosComponent implements OnInit {

  constructor(
    private router: Router,
    private msgService:MsgService,
    private user:UserService
  ) { }

  ngOnInit() {
    if(!this.user.isLogged())
      this.router.navigate(['login'])

  }

}
