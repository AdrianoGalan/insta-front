import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarComponent } from './gerar.component';

describe('GerarComponent', () => {
  let component: GerarComponent;
  let fixture: ComponentFixture<GerarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
