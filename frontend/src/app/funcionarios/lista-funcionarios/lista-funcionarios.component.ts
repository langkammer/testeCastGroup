import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MsgService } from 'src/app/core/msg.service';
import { UserService } from 'src/app/services/user.service';
import { FuncionariosDataSource } from './funcionarios-data.source';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { GenericService } from 'src/app/services/generic.service';
import { BottonButtonComponent } from 'src/app/shared/bottom/bottom-button.component';
import { CadFuncionarioComponent } from '../cad-funcionario/cad-funcionario.component';
import { CadFeriasComponent } from 'src/app/ferias/cad-ferias/cad-ferias.component';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-lista-funcionarios',
  templateUrl: './lista-funcionarios.component.html',
  styleUrls: ['./lista-funcionarios.component.css']
})
export class ListaFuncionariosComponent implements OnInit {

  displayedColumns: string[] = ['matricula','foto','nome','dataNascimento' , 'dataAdmissao','equipe','detalhes'];

  dataSource: FuncionariosDataSource;

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

    this.dataSource = new FuncionariosDataSource(this.service);

    this.loadPages();
  }

  ngAfterViewInit() {
    
  } 

  openMenu(equipe:any): void {
    this.bottomSheet.open(BottonButtonComponent,
      { 
        data: {
          showDelete : true,  
          showView   : true,  
          showEdit   : true, 
          showScFerias : true
        }
      }).afterDismissed().subscribe(
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
    const dialogRef = this.dialog.open(CadFuncionarioComponent, {
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
    if(tip=="Ferias")
      this.abreModalScFerias(tip,obj);
    else
      this.openModal(tip,obj);
  }

  abreModalScFerias(tipoCrud:String,funcionario:any){
    console.log("Solicita Ferias");
    if(!tipoCrud)
      tipoCrud = "Nova";
    const dialogRef = this.dialog.open(CadFeriasComponent, {
      width: '600px',
      data: {action: tipoCrud, 
        obj: { 
              funcionario : funcionario, 
              dataInicial : undefined,
              dataFinal : undefined
        } 
      }

    });

    dialogRef.afterClosed().subscribe((equipe: any)  => {
      console.log('The dialog was closed');
    //   this.animal = result;
        console.log(equipe);
        if(!!equipe){
          this.loadPages();
          this.msgService.open("Sc Ferias  ! : " , equipe)
        }
    });
  }

}
