/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FirebaseUploadService } from './firebaseUpload.service';

describe('Service: FirebaseUpload', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseUploadService]
    });
  });

  it('should ...', inject([FirebaseUploadService], (service: FirebaseUploadService) => {
    expect(service).toBeTruthy();
  }));
});
