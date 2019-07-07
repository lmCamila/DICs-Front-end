import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DicKanbanComponent } from './dic-kanban.component';

describe('DicKanbanComponent', () => {
  let component: DicKanbanComponent;
  let fixture: ComponentFixture<DicKanbanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DicKanbanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DicKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
