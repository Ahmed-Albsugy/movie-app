import { TestBed } from '@angular/core/testing';

import { WatchMovieService } from './watch-movie.service';

describe('WatchMovieService', () => {
  let service: WatchMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
