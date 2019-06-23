import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DICsComponent } from './dics.component';

describe('DICsComponent', () => {
  let component: DICsComponent;
  let fixture: ComponentFixture<DICsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DICsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DICsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
