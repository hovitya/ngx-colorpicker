import { TestBed, inject } from '@angular/core/testing';

import { NgxColorStoreService } from './ngx-color-store.service';

describe('NgxColorStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxColorStoreService]
    });
  });

  it('should be created', inject([NgxColorStoreService], (service: NgxColorStoreService) => {
    expect(service).toBeTruthy();
  }));
});
