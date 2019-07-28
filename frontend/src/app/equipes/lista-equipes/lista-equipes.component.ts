import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { EquipesDataSource } from './equipes-data.source';
import { BottonButtonComponent } from 'src/app/shared/bottom/bottom-button.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MatBottomSheet, MatPaginator } from '@angular/material';
import { GenericService } from 'src/app/services/generic.service';

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
    private service:GenericService
  ) { }

  ngOnInit() {
    if(!this.user.isLogged())
      this.router.navigate(['login'])

    this.dataSource = new EquipesDataSource(this.service);

    this.loadPages();
  }

  ngAfterViewInit() {
    
  } 

  openMenu(liga:any): void {
    this.bottomSheet.open(BottonButtonComponent).afterDismissed().subscribe(
      sucess => {
        if(!!sucess)
          this.vaiParaMenu(sucess,liga);
        else
          console.log("Fechou sem resultados ...");  
      }
    );
    console.log("ACESSOU SUB MENU");
  }

  loadPages() {
    this.dataSource.load(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.nome);
  }

  vaiParaMenu(tip,obj:any){
    if(tip!="Deletar")
      console.log("impl")
  }

}
