import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/login.interface';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  emailForm:string = "";
  senhaForm:string = "";

  @BlockUI() blockUI: NgBlockUI;

  loginForm: FormGroup;

  user = {} as User ;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService
     ) 
  {
    this.loginForm = this.formBuilder.group({
      email : ['', Validators.required],
      senha : ['',Validators.required]
    })
  } 

  ngOnInit(): void {
    

  }
  login() {
      this.user.email = this.emailForm;
      this.user.pass = this.senhaForm;
      if(this.auth.authenticate(this.user))
        alert("Logou");
      
        
  }



}
