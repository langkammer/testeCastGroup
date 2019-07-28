import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { GenericService } from "src/app/services/generic.service";
import { ResponseBodyListInterface } from "src/app/interfaces/response-body-list-Interface";

export class EquipesDataSource implements DataSource<any> {

    private listSubject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    totalElements = 0 as number;
    totalPages = 0 as number;
  

    constructor(private service: GenericService) {}
  
    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.listSubject.asObservable();
    }
  
    disconnect(collectionViewer: CollectionViewer): void {
        this.listSubject.complete();
    }
  
    load(page = 0,size = 10, nome = "") {
        console.log("Equipe");
        this.service.listarEquipes(page,size,nome).pipe(
              catchError(() => of([])),
              finalize(() => this.loadingSubject.next(false))
          )
          .subscribe((res : ResponseBodyListInterface) => {
                      this.listSubject.next(res.data)
                      this.totalElements = 0;
                      this.totalPages    = 0;  
          });
    } 

}