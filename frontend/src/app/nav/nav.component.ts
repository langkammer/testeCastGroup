import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { SidenavService } from '../services/sidenav.service';
import { onMainContentChange } from '../animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [ onMainContentChange ]

})
export class NavBarComponent implements OnInit {

  email = "";


  isAdmin:boolean = false;

  @BlockUI() blockUI: NgBlockUI;

  public onSideNavChange: boolean;

  constructor(
    private _sidenavService: SidenavService
    ) 
  {
    this._sidenavService.sideNavState$.subscribe( res => {
      console.log(res)
      this.onSideNavChange = res;
    })


  } 

  ngOnInit(): void {
   
  }

  logout() {
    console.log("deslogou ... ")
  }




}
