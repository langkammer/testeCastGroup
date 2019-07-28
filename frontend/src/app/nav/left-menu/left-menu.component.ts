import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../services/sidenav.service'
import { onSideNavChange, animateText } from 'src/app/animations/animations';


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

  public pages: Page[] = [

    {name: 'Cad. Equipe', rota:'equipes', icon: 'group'},
    {name: 'Cad. Funcionarios', rota:'funcionarios', icon: 'face'},
    {name: 'Soc. Férias', rota:'ferias', icon: 'flight_takeoff'}

  ]

  constructor(private _sidenavService: SidenavService) { }

  ngOnInit() {
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState
    
    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200)
    this._sidenavService.sideNavState$.next(this.sideNavState)
  }


}