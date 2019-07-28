import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef,  MAT_BOTTOM_SHEET_DATA } from '@angular/material';

export interface DataBotton{
  showDelete:boolean;
  showView:boolean;
  showEdit:boolean;

}

@Component({
  selector: 'app-botton-button',
  templateUrl: './bottom-button.component.html',
  styleUrls: ['./bottom-button.component.css']
})
export class BottonButtonComponent implements OnInit {

  showDelete:boolean = true;
  showView:boolean = true;
  showEdit:boolean = true;

  ngOnInit(): void {
    console.log("INICIALIZAOU SUB MENU BOTTON")
  }
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottonButtonComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data : DataBotton ) {
    if(data){
      this.showDelete = data.showDelete;
      this.showView = data.showView;
      this.showEdit = data.showEdit;
    }  
    console.log(data);
  }
  openMenu(event: MouseEvent,evento:string,obj:any): void {
    console.log("EVENTO : => ", evento);
    this._bottomSheetRef.dismiss(evento);
    event.preventDefault();
  }

}
