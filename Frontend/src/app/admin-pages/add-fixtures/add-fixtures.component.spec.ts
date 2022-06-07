import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFixturesComponent } from './add-fixtures.component';

describe('AddFixturesComponent', () => {
  let component: AddFixturesComponent;
  let fixture: ComponentFixture<AddFixturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFixturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFixturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
