import { TestBed } from '@angular/core/testing';

import { ClubReviewService } from './club-review.service';

describe('ClubReviewService', () => {
  let service: ClubReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
