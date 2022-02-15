import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoStatusComponent } from './novo-status.component';

describe('NovoStatusComponent', () => {
  let component: NovoStatusComponent;
  let fixture: ComponentFixture<NovoStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
