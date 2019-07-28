import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, finalize } from 'rxjs/operators';
import { ResponseBodyInterface } from '../interfaces/response-body-Interface';
import { GenericService } from './generic.service';
import { UserService } from './user.service';
import { User } from '../interfaces/login.interface';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Config } from '../config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient)
    { }

  @BlockUI() blockUI: NgBlockUI;

  authenticate(user:User) {
    this.blockUI.start("Logando ....")
    return this.http.post<ResponseBodyInterface>(Config.api + '/auth',  user)
              .pipe(finalize(() => {
                  console.log('Finalizado ...');
                  this.blockUI.stop();
              }))
              .subscribe((res : ResponseBodyInterface) => {
                if(res.status == "SUCESSO"){
                  this.userService.setToken(res.data.token);
                  console.log('User authenticated with token res.data.token');
                  return true;
                }
                else{
                  alert("ERRO AO LOGAR USUARIO");
                  return false;
                }
        
              });
  }
}