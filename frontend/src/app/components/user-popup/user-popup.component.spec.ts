import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPopupComponent } from './user-popup.component';

describe('UserPopupComponent', () => {
  let component: UserPopupComponent;
  let fixture: ComponentFixture<UserPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
