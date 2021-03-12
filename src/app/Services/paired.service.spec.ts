/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PairedService } from './paired.service';

describe('Service: Paired', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PairedService]
    });
  });

  it('should ...', inject([PairedService], (service: PairedService) => {
    expect(service).toBeTruthy();
  }));
});
