import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarolesComponent } from './listaroles.component';

describe('ListarolesComponent', () => {
  let component: ListarolesComponent;
  let fixture: ComponentFixture<ListarolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
