import { TestBed } from '@angular/core/testing';

import { OlMapId } from './mapid.service';

describe('MapidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OlMapId = TestBed.get(OlMapId);
    expect(service).toBeTruthy();
  });
});
