import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../services/sidenav.service'
import { onSideNavChange, animateText } from 'src/app/animations/animations';
import { UserService } from 'src/app/services/user.service';


interface Page {
  rota: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  animations: [onSideNavChange, animateText]
})
export class LeftMenuComponent implements OnInit {
  public sideNavState: boolean = false;
  public linkText: boolean = false;


  nameUser:string;
  public pages: Page[] = [

    {name: 'Cad. Equipe', rota:'equipes', icon: 'group'},
    {name: 'Cad. Funcionarios', rota:'funcionarios', icon: 'face'},
    {name: 'Soc. Férias', rota:'ferias', icon: 'flight_takeoff'}

  ]

  constructor(private _sidenavService: SidenavService,private user: UserService) { }

  ngOnInit() {
    this.nameUser = this.user.getUserName();
    console.log(this.nameUser)
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState
    
    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200)
    this._sidenavService.sideNavState$.next(this.sideNavState)
  }


}