import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevorolComponent } from './nuevorol.component';

describe('NuevorolComponent', () => {
  let component: NuevorolComponent;
  let fixture: ComponentFixture<NuevorolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevorolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevorolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
