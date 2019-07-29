import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericService } from 'src/app/services/generic.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CadEquipeComponent } from 'src/app/equipes/cad-equipe/cad-equipe.component';
import { MatDataDialogInterface } from 'src/app/interfaces/generic.interfaces';
import { MsgService } from 'src/app/core/msg.service';

@Component({
  selector: 'app-cad-ferias',
  templateUrl: './cad-ferias.component.html',
  styleUrls: ['./cad-ferias.component.css']
})
export class CadFeriasComponent implements OnInit {

  form: FormGroup;

  ferias =  {} as any;

  constructor( public service: GenericService,
    public dialogRef: MatDialogRef<CadEquipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDataDialogInterface,
    public msgService : MsgService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      dataInicialForm  : ['',Validators.required],
      dataFinalForm  : ['',Validators.required]

    })


    this.ferias = this.data.obj;
    console.log("Sc Ferias : " , this.data.obj);

    if(this.data.action  == "Ver" || this.data.action == "Deletar"){ 
      this.form.disable();
    }
  }



  
  cancelar(): void {
    this.dialogRef.close();
  }


  confirmar(): void {
    if(this.data.action == "Deletar")
      this.deletar();
    else if(this.data.action == "Editar")
      this.salvar();
    //nao esquecer de implementar
    this.salvar();

  }


  deletar(){
    this.service.deleteFerias(this.ferias.id).subscribe(
          sucesso =>{
            console.log("RES ", sucesso);
            if(sucesso.status == "SUCESSO")
              this.resetLogin();
            else
              this.msgService.open(sucesso.status , sucesso.menssage);
          },
          error =>{
            this.msgService.open("ERROR : => ", error.message);

          }
        )
  }


  salvar(): void{
    this.service.criarFerias(this.ferias).subscribe(
      sucesso =>{
        console.log("RES ", sucesso);
        if(sucesso.status == "SUCESSO")
          this.resetLogin();
        else
          this.msgService.open(sucesso.status , sucesso.menssage);
      },
      error =>{
        this.msgService.open("ERROR : => ", error.message);

      }); 
   
  }



  resetLogin(){
    this.dialogRef.close(this.ferias);
  } 


}
