import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DICCardComponent } from './dic-card.component';

describe('DICCardComponent', () => {
  let component: DICCardComponent;
  let fixture: ComponentFixture<DICCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DICCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DICCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
