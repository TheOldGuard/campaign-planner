import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortentListComponent } from './portent-list.component';

describe('PortentListComponent', () => {
  let component: PortentListComponent;
  let fixture: ComponentFixture<PortentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
