import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UpcomingTournamentsComponent} from './upcoming-tournaments.component';

describe('UpcomingTournamentsComponent', () => {
  let component: UpcomingTournamentsComponent;
  let fixture: ComponentFixture<UpcomingTournamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpcomingTournamentsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingTournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
