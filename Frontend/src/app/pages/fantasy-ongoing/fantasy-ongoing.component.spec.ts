import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FantasyOngoingComponent } from './fantasy-ongoing.component';

describe('FantasyOngoingComponent', () => {
  let component: FantasyOngoingComponent;
  let fixture: ComponentFixture<FantasyOngoingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FantasyOngoingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FantasyOngoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
