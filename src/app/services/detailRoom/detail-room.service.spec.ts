import { TestBed } from '@angular/core/testing';

import { DetailRoomService } from './detail-room.service';

describe('DetailRoomService', () => {
  let service: DetailRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
