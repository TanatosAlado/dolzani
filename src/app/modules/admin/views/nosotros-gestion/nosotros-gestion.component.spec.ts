import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosotrosGestionComponent } from './nosotros-gestion.component';

describe('NosotrosGestionComponent', () => {
  let component: NosotrosGestionComponent;
  let fixture: ComponentFixture<NosotrosGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NosotrosGestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NosotrosGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
