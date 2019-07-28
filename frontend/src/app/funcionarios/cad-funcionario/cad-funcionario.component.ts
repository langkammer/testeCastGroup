import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericService } from 'src/app/services/generic.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CadEquipeComponent } from 'src/app/equipes/cad-equipe/cad-equipe.component';
import { MatDataDialogInterface } from 'src/app/interfaces/generic.interfaces';
import { MsgService } from 'src/app/core/msg.service';

@Component({
  selector: 'app-cad-funcionario',
  templateUrl: './cad-funcionario.component.html',
  styleUrls: ['./cad-funcionario.component.css']
})
export class CadFuncionarioComponent implements OnInit {


  form: FormGroup;

  funcionario = {} as any;

  equipe = {} as any;
  endereco = {} as any;

  equipes = [] as any[];

  constructor( public service: GenericService,
    public dialogRef: MatDialogRef<CadEquipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDataDialogInterface,
    public msgService : MsgService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      fotoForm : [''],
      nomeForm  : ['',Validators.required],
      dataNascimentoForm  : [''],
      ruaForm : [''],
      numeroForm : [''],
      complementoForm : [''],
      bairroForm : [''],
      cidadeForm : [''],
      estadoForm : ['']
    })


    if(this.data.obj){
      this.funcionario = this.data.obj;
      this.endereco = this.data.obj.endereco;
      this.equipe = this.data.obj.equipe;
    }
    else{
      this.funcionario = {};
      this.endereco = {};
      this.equipe = {};
    }

    console.log("Funcionario : " , this.data.obj);

    if(this.data.action  == "Ver" || this.data.action == "Deletar"){ 
      this.form.disable();
    }
    this.listEquipes();
  }


  listEquipes(){
    this.service.listarTodasEquipes().subscribe(
      sucesso =>{
        console.log("RES ", sucesso);
        if(sucesso.status == "SUCESSO")
          this.equipes = sucesso.data;
        else
          this.msgService.open(sucesso.status , sucesso.menssage);
      },
      error =>{
        this.msgService.open("ERROR : => ", error.message);

    }); 
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
    this.service.criarFuncionario(this.equipe).subscribe(
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
