import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StakesListComponent } from './stakes-list.component';

describe('StakesListComponent', () => {
  let component: StakesListComponent;
  let fixture: ComponentFixture<StakesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StakesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StakesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
