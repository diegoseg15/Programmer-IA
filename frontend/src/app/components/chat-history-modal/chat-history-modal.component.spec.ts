import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHistoryModalComponent } from './chat-history-modal.component';

describe('ChatHistoryModalComponent', () => {
  let component: ChatHistoryModalComponent;
  let fixture: ComponentFixture<ChatHistoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatHistoryModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
