import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs'


@Injectable()
export class SidenavService {

  // With this subject you can save the sidenav state and consumed later into other pages.
  public sideNavState$: Subject<boolean> = new Subject();
  private logado = new BehaviorSubject<boolean>(false);

  constructor() { }

  getLogado() {
    return this.logado.asObservable();
  }

  deslogar(){
    this.logado.next(false);
  }

  logar(){
    this.logado.next(true);
  }

}