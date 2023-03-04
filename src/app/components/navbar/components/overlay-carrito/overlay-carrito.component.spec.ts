import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayCarritoComponent } from './overlay-carrito.component';

describe('OverlayCarritoComponent', () => {
  let component: OverlayCarritoComponent;
  let fixture: ComponentFixture<OverlayCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverlayCarritoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlayCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
