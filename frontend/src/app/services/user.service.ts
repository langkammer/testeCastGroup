import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
import * as jtw_decode from 'jwt-decode';
import { GenericService } from './generic.service';
import { SidenavService } from './sidenav.service';

@Injectable({ providedIn: 'root'})
export class UserService { 

    private userSubject = new BehaviorSubject<any>(null);
    private userName: string;
    private idUser:number;

    constructor(private tokenService: TokenService,private service:GenericService) { 

        this.tokenService.hasToken() && 
            this.decodeAndNotify();



    }



    setToken(token: string) {
        this.tokenService.setToken(token);
        this.userSubject.next(true);
        this.decodeAndNotify();
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    private decodeAndNotify() {
        const token = this.tokenService.getToken();
        const user = jtw_decode(token) as any;
        this.userName = user.name;
        this.idUser = user.sub;
        this.userSubject.next(user);
        console.log("A")
    }

    logout() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }

    isLogged() {
        return this.tokenService.hasToken();
    }

    getUserName() {
        return this.userName;
    }

    getIdUser() {
        return this.idUser;
    }
}