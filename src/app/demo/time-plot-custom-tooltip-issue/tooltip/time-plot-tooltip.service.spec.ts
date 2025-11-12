import { TestBed } from '@angular/core/testing';

import { TimePlotTooltipService } from './time-plot-tooltip.service';

describe('TooltipService', () => {
  let service: TimePlotTooltipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimePlotTooltipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
