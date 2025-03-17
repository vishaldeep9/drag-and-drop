import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasBasicComponent } from './canvas-basic.component';

describe('CanvasBasicComponent', () => {
  let component: CanvasBasicComponent;
  let fixture: ComponentFixture<CanvasBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
