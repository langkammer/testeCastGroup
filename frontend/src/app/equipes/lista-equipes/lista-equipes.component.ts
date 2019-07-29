import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { EquipesDataSource } from './equipes-data.source';
import { BottonButtonComponent } from 'src/app/shared/bottom/bottom-button.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { GenericService } from 'src/app/services/generic.service';
import { CadEquipeComponent } from '../cad-equipe/cad-equipe.component';
import { MsgService } from 'src/app/core/msg.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-lista-equipes',
  templateUrl: './lista-equipes.component.html',
  styleUrls: ['./lista-equipes.component.css']
})
export class ListaEquipesComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['id','nome' , 'data','detalhes'];

  dataSource: EquipesDataSource;

  nome:string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private bottomSheet: MatBottomSheet,
    private router: Router,
    private user:UserService,
    private service:GenericService,
    private msgService:MsgService,
    public dialog: MatDialog,
    private _sideNavService:SidenavService

  ) { }

  ngOnInit() {
    this._sideNavService.getLogado().subscribe((logado:boolean) =>{
      if(!logado)
      {
        this.router.navigate(['login'])
      }
    })

    this.dataSource = new EquipesDataSource(this.service);

    this.loadPages();
  }

  ngAfterViewInit() {
    
  } 

  openMenu(equipe:any): void {
    this.bottomSheet.open(BottonButtonComponent).afterDismissed().subscribe(
      sucess => {
        if(!!sucess)
          this.vaiParaMenu(sucess,equipe);
        else
          console.log("Fechou sem resultados ...");  
      }
    );
    console.log("ACESSOU SUB MENU");
  }


  openModal(tipoCrud:String,equipe:any) : void{
    console.log("abre modal equipe");
    if(!tipoCrud)
      tipoCrud = "Nova";
    const dialogRef = this.dialog.open(CadEquipeComponent, {
      width: '600px',
      data: {action: tipoCrud, obj: equipe}

    });

    dialogRef.afterClosed().subscribe((equipe: any)  => {
      console.log('The dialog was closed');
    //   this.animal = result;
        console.log(equipe);
        if(!!equipe){
          this.loadPages();
          this.msgService.open("Nova Equipe  ! : " , equipe)
        }
    });
  }


  loadPages() {
    this.dataSource.load(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.nome);
  }

  vaiParaMenu(tip,obj:any){
    this.openModal(tip,obj);
  }

}
