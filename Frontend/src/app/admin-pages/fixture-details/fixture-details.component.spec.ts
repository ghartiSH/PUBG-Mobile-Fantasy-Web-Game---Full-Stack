import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureDetailsComponent } from './fixture-details.component';

describe('FixtureDetailsComponent', () => {
  let component: FixtureDetailsComponent;
  let fixture: ComponentFixture<FixtureDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixtureDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixtureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
