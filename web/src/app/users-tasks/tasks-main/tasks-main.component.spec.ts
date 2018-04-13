import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTasksComponent } from './tasks-main.component';

describe('TasksMainComponent', () => {
  let component: UsersTasksComponent;
  let fixture: ComponentFixture<UsersTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
