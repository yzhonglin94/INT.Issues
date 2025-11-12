import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePlotCustomTooltipIssue } from './time-plot-custom-tooltip-issue';

describe('TimePlotCustomTooltipIssue', () => {
  let component: TimePlotCustomTooltipIssue;
  let fixture: ComponentFixture<TimePlotCustomTooltipIssue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimePlotCustomTooltipIssue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimePlotCustomTooltipIssue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
