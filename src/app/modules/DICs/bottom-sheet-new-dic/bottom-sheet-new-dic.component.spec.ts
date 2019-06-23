import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetNewDicComponent } from './bottom-sheet-new-dic.component';

describe('BottomSheetNewDicComponent', () => {
  let component: BottomSheetNewDicComponent;
  let fixture: ComponentFixture<BottomSheetNewDicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomSheetNewDicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetNewDicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
