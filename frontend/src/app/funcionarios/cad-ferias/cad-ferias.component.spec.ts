import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadFeriasComponent } from './cad-ferias.component';

describe('CadFeriasComponent', () => {
  let component: CadFeriasComponent;
  let fixture: ComponentFixture<CadFeriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadFeriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadFeriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
