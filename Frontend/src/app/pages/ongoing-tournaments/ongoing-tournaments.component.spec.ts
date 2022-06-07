import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OngoingTournamentsComponent} from './ongoing-tournaments.component';

describe('OngoingTournamentsComponent', () => {
  let component: OngoingTournamentsComponent;
  let fixture: ComponentFixture<OngoingTournamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OngoingTournamentsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingTournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
