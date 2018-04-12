import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from './tasks-services/task.service';
import { TaskTestService } from './tasks-services/task-test.service';
import { UsersTasksComponent } from './tasks-main/tasks-main.component';
import { TaskAreasComponent } from './tasks-areas/task-areas.component';
import { TaskAreaComponent } from './tasks-area/task-area.component';
import { UserTaskComponent } from './user-task/user-task.component';
import { TaskFormComponent, AreasPipe } from './task-form/task-form.component';
import { FormsModule } from '@angular/forms';
import { TaskNavigationComponent } from './task-navigation/task-navigation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  
  providers: [{provide: TaskService, useClass: TaskTestService}],
  declarations: [
    UsersTasksComponent,
    TaskAreasComponent,
    TaskAreaComponent,
    UserTaskComponent,
    TaskFormComponent,
    AreasPipe,
    TaskNavigationComponent
  ],
  exports: [UsersTasksComponent],
  bootstrap: [UsersTasksComponent]
})
export class UsersTasksModule { }
