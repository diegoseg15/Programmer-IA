import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualCodeComponentComponent } from './visual-code-component.component';

describe('VisualCodeComponentComponent', () => {
  let component: VisualCodeComponentComponent;
  let fixture: ComponentFixture<VisualCodeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualCodeComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualCodeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
