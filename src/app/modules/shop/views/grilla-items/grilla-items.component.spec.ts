import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaItemsComponent } from './grilla-items.component';

describe('GrillaItemsComponent', () => {
  let component: GrillaItemsComponent;
  let fixture: ComponentFixture<GrillaItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrillaItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrillaItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
