import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Config } from '../config';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ResponseBodyInterface } from '../interfaces/response-body-Interface';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  load:string = "Aguarde ... ";
  
  

  constructor(private http: HttpClient,private  token:TokenService) { }

  @BlockUI() blockUI: NgBlockUI;


  get(service)  : Observable<ResponseBodyInterface>  {
    this.blockUI.start(this.load)
    return this.http.get<ResponseBodyInterface>(Config.api + service)
    .pipe(
      finalize(() => {
        console.log('Finalizado ...');
        this.blockUI.stop();
      })
    );
   
  }

 

  post(service: string,data: any) : Observable<ResponseBodyInterface> {
    this.blockUI.start(this.load)
    return this.http
    .post<ResponseBodyInterface>(Config.api + service ,data)
    .pipe(finalize(() => {
      console.log('Finalizado ...');
      this.blockUI.stop();
    }) );
  }

  put(service: string,data: any) : Observable<ResponseBodyInterface> {
    this.blockUI.start(this.load)
    return this.http
      .put<ResponseBodyInterface>(Config.api + service ,data)
      .pipe(finalize(() => {
        console.log('Finalizado ...');
        this.blockUI.stop();
      }) );
   
  }

  delete(service)  : Observable<ResponseBodyInterface>  {
    this.blockUI.start(this.load)
    return this.http.delete<ResponseBodyInterface>(Config.api + service)
    .pipe(
      finalize(() => {
        console.log('Finalizado ...');
        this.blockUI.stop();
      })
    );
  }
  

      


}
