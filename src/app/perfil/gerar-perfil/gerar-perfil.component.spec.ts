import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarPerfilComponent } from './gerar-perfil.component';

describe('GerarPerfilComponent', () => {
  let component: GerarPerfilComponent;
  let fixture: ComponentFixture<GerarPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerarPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
