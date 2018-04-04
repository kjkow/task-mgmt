import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAreaComponent } from './task-area.component';

describe('TaskAreaComponent', () => {
  let component: TaskAreaComponent;
  let fixture: ComponentFixture<TaskAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
