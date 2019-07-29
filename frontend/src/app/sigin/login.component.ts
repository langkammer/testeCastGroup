import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/login.interface';
import { SidenavService } from '../services/sidenav.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  emailForm:string = "";
  senhaForm:string = "";
  logado:boolean = false;
  @BlockUI() blockUI: NgBlockUI;

  loginForm: FormGroup;

  user = {} as User ;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private _sideNavService:SidenavService
     ) 
  {
    this.loginForm = this.formBuilder.group({
      email : ['', Validators.required],
      senha : ['',Validators.required]
    })
  } 

  ngOnInit(): void {
    this._sideNavService.getLogado().subscribe((logado:boolean) =>{
      this.logado = logado;
      if(logado)
      {
        this.router.navigate(['user'])
      }
    })

  }
  login() {
      this.user.email = this.emailForm;
      this.user.pass = this.senhaForm;
      if(this.auth.authenticate(this.user)){
        alert("Logou");
        this.router.navigate(['user']);
      }
      
        
  }



}
