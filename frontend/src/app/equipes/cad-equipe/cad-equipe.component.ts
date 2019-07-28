import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericService } from 'src/app/services/generic.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MsgService } from 'src/app/core/msg.service';
import { MatDataDialogInterface } from 'src/app/interfaces/generic.interfaces';

@Component({
  selector: 'app-cad-equipe',
  templateUrl: './cad-equipe.component.html',
  styleUrls: ['./cad-equipe.component.css']
})
export class CadEquipeComponent implements OnInit {

  form: FormGroup;

  equipe =  {} as any;

  constructor( public service: GenericService,
    public dialogRef: MatDialogRef<CadEquipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDataDialogInterface,
    public msgService : MsgService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nomeForm  : ['',Validators.required]
    })


    this.equipe = this.data.obj;
    console.log("Equipe : " , this.data.obj);

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
    this.service.deleteEquipe(this.equipe.id).subscribe(
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
    this.service.criarEquipe(this.equipe).subscribe(
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
    this.dialogRef.close(this.equipe);
  } 


}
