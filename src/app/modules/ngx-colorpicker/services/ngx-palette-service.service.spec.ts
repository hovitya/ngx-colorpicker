import { TestBed, inject } from '@angular/core/testing';

import { NgxPaletteService } from './ngx-palette.service';

describe('NgxPaletteServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxPaletteService]
    });
  });

  it('should be created', inject([NgxPaletteService], (service: NgxPaletteService) => {
    expect(service).toBeTruthy();
  }));
});
