import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEquipesComponent } from './lista-equipes.component';

describe('ListaEquipesComponent', () => {
  let component: ListaEquipesComponent;
  let fixture: ComponentFixture<ListaEquipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEquipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEquipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
