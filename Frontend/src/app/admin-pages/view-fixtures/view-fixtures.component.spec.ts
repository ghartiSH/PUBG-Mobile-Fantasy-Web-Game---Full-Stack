import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFixturesComponent } from './view-fixtures.component';

describe('ViewFixturesComponent', () => {
  let component: ViewFixturesComponent;
  let fixture: ComponentFixture<ViewFixturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFixturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFixturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
