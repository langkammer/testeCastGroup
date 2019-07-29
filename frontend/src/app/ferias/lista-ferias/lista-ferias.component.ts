import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MsgService } from 'src/app/core/msg.service';
import { UserService } from 'src/app/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { GenericService } from 'src/app/services/generic.service';
import { MatDialog } from '@angular/material/dialog';
import { FuncionariosDataSource } from 'src/app/funcionarios/lista-funcionarios/funcionarios-data.source';
import { BottonButtonComponent } from 'src/app/shared/bottom/bottom-button.component';
import { CadFuncionarioComponent } from 'src/app/funcionarios/cad-funcionario/cad-funcionario.component';
import { ScFeriasDataSource } from './sc-ferias-data.source';
import { CadFeriasComponent } from '../cad-ferias/cad-ferias.component';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-lista-ferias',
  templateUrl: './lista-ferias.component.html',
  styleUrls: ['./lista-ferias.component.css']
})
export class ListaFeriasComponent implements OnInit {

  displayedColumns: string[] = ['funcionario','equipe','dataIni','dataFim' ,'detalhes'];

  dataSource: ScFeriasDataSource;

  pesquisa:string;

  campo:string = "nome";

  tipoPesquisa:string = "all"

  meses:number = 1;

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

    this.dataSource = new ScFeriasDataSource(this.service);

    this.loadPages();
  }

  ngAfterViewInit() {
    
  } 

  trocaTipoLista(tipo){
    this.tipoPesquisa = tipo;
    this.loadPages();
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
    const dialogRef = this.dialog.open(CadFeriasComponent, {
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
      this.pesquisa,
      this.campo,
      this.tipoPesquisa,
      this.meses);
  }

  vaiParaMenu(tip,obj:any){
    this.openModal(tip,obj);
  }
}
