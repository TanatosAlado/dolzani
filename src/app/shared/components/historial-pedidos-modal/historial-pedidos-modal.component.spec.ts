import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPedidosModalComponent } from './historial-pedidos-modal.component';

describe('HistorialPedidosModalComponent', () => {
  let component: HistorialPedidosModalComponent;
  let fixture: ComponentFixture<HistorialPedidosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialPedidosModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialPedidosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
