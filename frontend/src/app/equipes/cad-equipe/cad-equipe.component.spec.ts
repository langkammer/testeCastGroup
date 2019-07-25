import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadEquipeComponent } from './cad-equipe.component';

describe('CadEquipeComponent', () => {
  let component: CadEquipeComponent;
  let fixture: ComponentFixture<CadEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
