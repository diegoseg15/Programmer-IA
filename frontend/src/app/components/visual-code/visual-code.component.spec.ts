import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualCodeComponent } from './visual-code.component';

describe('VisualCodeComponent', () => {
  let component: VisualCodeComponent;
  let fixture: ComponentFixture<VisualCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
