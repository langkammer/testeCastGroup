import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../services/sidenav.service'
import { onSideNavChange, animateText } from 'src/app/animations/animations';
import { UserService } from 'src/app/services/user.service';
import { GenericService } from 'src/app/services/generic.service';


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

  constructor(private _sidenavService: SidenavService,
    private user: UserService,
    private service:GenericService) { }

  ngOnInit() {
    this.nameUser = this.user.getUserName();
    this.user.getUser().subscribe((res:any) =>{
      if(res){
        this.getUserDecoded();
      }
      else{
        this.nameUser = ""; 
        this._sidenavService.deslogar();    
      }
    });

    console.log(this.nameUser)
  }

  getUserDecoded(){
    let idUser = this.user.getIdUser();
    this.getDadosUsuario(idUser);
  }

  getDadosUsuario(idUser:number){
      this.service.getUsuario(idUser).subscribe((res:any) =>{
        if(res.status == "SUCESSO")
          this.nameUser = res.data.nome;
      })
   
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState
    
    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200)
    this._sidenavService.sideNavState$.next(this.sideNavState)
  }


}