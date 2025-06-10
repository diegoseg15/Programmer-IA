import { TestBed } from '@angular/core/testing';

import { AiChatsService } from './ai-chats.service';

describe('AiChatsService', () => {
  let service: AiChatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiChatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
