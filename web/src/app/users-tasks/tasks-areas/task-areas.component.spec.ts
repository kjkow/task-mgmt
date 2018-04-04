import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAreasComponent } from './task-areas.component';

describe('TaskAreasComponent', () => {
  let component: TaskAreasComponent;
  let fixture: ComponentFixture<TaskAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
