import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFeriasComponent } from './lista-ferias.component';

describe('ListaFeriasComponent', () => {
  let component: ListaFeriasComponent;
  let fixture: ComponentFixture<ListaFeriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaFeriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFeriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
