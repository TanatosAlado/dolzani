import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRubrosComponent } from './lista-rubros.component';

describe('ListaRubrosComponent', () => {
  let component: ListaRubrosComponent;
  let fixture: ComponentFixture<ListaRubrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaRubrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaRubrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
