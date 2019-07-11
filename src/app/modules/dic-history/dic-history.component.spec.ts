import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DicHistoryComponent } from './dic-history.component';

describe('DicHistoryComponent', () => {
  let component: DicHistoryComponent;
  let fixture: ComponentFixture<DicHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DicHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DicHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
