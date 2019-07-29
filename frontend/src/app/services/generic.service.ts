import { Injectable } from '@angular/core';
import { RequestService } from '../core/request.services';
import { User } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  
  constructor(
    private request: RequestService
  ){}


  // services equipes
  listarEquipes(page,size,nome) {
    return this.request.get('/equipe');
  }

  listarTodasEquipes() {
    return this.request.get('/equipe/all');
  }

  criarEquipe(equipe: any){
    return this.request.post('/equipe', equipe);
  }

  updateEquipe(equipe: any){
    return this.request.put('/equipe', equipe);
  }

  deleteEquipe(id) {
    return this.request.delete('/equipe/' + id);
  }



  /// services funcionario

  
  listarFuncionarios(page,size,nome) {
    return this.request.get('/funcionario');
  }

  criarFuncionario(data: any){
    return this.request.post('/funcionario', data);
  }

  updateFuncionario(data: any){
    return this.request.put('/funcionario', data);
  }

  deleteFuncionario(id) {
    return this.request.delete('/funcionario/' + id);
  }



  /// services ferias


  listBySolicitacaoFerias(page,size,nome) {
    return this.request.get('/ferias');
  }

  listByFeriasVencendo(page,size,nome) {
    return this.request.get('ferias/listByFeriasVencendo');
  }

  listFeriasByMatricula(page,size,nome) {
    return this.request.get('ferias/listByMatricula');
  }


  criarFerias(data: any){
    return this.request.post('/ferias', data);
  }

  updateFerias(data: any){
    return this.request.put('/ferias', data);
  }

  deleteFerias(id) {
    return this.request.delete('/ferias/' + id);
  }

}
