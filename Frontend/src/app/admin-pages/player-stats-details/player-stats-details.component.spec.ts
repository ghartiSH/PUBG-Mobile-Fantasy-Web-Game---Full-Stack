import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerStatsDetailsComponent } from './player-stats-details.component';

describe('PlayerStatsDetailsComponent', () => {
  let component: PlayerStatsDetailsComponent;
  let fixture: ComponentFixture<PlayerStatsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerStatsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerStatsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
