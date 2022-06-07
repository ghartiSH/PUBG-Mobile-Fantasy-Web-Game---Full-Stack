import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMatchdayComponent } from './add-matchday.component';

describe('AddMatchdayComponent', () => {
  let component: AddMatchdayComponent;
  let fixture: ComponentFixture<AddMatchdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMatchdayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMatchdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
