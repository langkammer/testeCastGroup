import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFuncionariosByLimiteComponent } from './lista-funcionarios-by-limite.component';

describe('ListaFuncionariosByLimiteComponent', () => {
  let component: ListaFuncionariosByLimiteComponent;
  let fixture: ComponentFixture<ListaFuncionariosByLimiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaFuncionariosByLimiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFuncionariosByLimiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
