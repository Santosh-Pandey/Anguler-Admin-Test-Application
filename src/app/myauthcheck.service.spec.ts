import { TestBed } from '@angular/core/testing';

import { MyauthcheckService } from './myauthcheck.service';

describe('MyauthcheckService', () => {
  let service: MyauthcheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyauthcheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
