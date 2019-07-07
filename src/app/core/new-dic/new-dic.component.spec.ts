import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDicComponent } from './new-dic.component';

describe('BottomSheetNewDicComponent', () => {
  let component: NewDicComponent;
  let fixture: ComponentFixture<NewDicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
