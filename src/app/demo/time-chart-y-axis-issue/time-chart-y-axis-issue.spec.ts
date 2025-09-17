import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeChartYAxisIssue } from './time-chart-y-axis-issue';

describe('TimeChartYAxisIssue', () => {
  let component: TimeChartYAxisIssue;
  let fixture: ComponentFixture<TimeChartYAxisIssue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeChartYAxisIssue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeChartYAxisIssue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
