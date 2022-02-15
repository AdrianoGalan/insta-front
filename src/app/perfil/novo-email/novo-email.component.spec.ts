import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoEmailComponent } from './novo-email.component';

describe('NovoEmailComponent', () => {
  let component: NovoEmailComponent;
  let fixture: ComponentFixture<NovoEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
