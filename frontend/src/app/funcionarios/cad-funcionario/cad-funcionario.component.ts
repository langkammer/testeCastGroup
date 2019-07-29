import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericService } from 'src/app/services/generic.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CadEquipeComponent } from 'src/app/equipes/cad-equipe/cad-equipe.component';
import { MatDataDialogInterface } from 'src/app/interfaces/generic.interfaces';
import { MsgService } from 'src/app/core/msg.service';
import { ResponseBodyInterface } from 'src/app/interfaces/response-body-Interface';
import { Config } from '../../config';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cad-funcionario',
  templateUrl: './cad-funcionario.component.html',
  styleUrls: ['./cad-funcionario.component.css']
})
export class CadFuncionarioComponent implements OnInit {
  
  [x: string]: any;

  @BlockUI() blockUI: NgBlockUI;

  form: FormGroup;

  fileToUpload: File = null;

  funcionario = {} as any;

  equipe = {} as any;
  endereco = {} as any;

  equipes = [] as any[];

  constructor( public service: GenericService,
    public dialogRef: MatDialogRef<CadEquipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDataDialogInterface,
    public msgService : MsgService,
    private formBuilder: FormBuilder,
    private http: HttpClient) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      fotoForm : [''],
      nomeForm  : ['',Validators.required],
      dataNascimentoForm  : [''],
      dataAdmissaoForm  : [''],
      equipeForm : ['',Validators.required],
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

  
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
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

    this.funcionario.equipe = this.equipe;
    
    this.funcionario.endereco = this.endereco;

    this.blockUI.start("Aguarde o Envio...")

    const formData = new FormData();
    
    formData.append('foto', this.fileToUpload);

    formData.append('funcionarioStringJson',JSON.stringify(this.funcionario))

    this.http.post(Config.api + '/funcionario', formData)
      .subscribe((res:ResponseBodyInterface) => {
        this.blockUI.stop();
        if(res.status == "SUCESSO")
          this.resetLogin();
        else
          this.msgService.open(res.status , res.menssage);
      })
   
   
  }



  resetLogin(){
    this.dialogRef.close(this.equipe);
  } 


}
