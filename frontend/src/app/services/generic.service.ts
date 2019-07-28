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

  listarEquipes(page,size,nome) {
    return this.request.get('/equipe');
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


}
