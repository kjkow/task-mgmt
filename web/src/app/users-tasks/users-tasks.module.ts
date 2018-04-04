import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from './tasks-services/task.service';
import { TaskTestService } from './tasks-services/task-test.service';
import { UsersTasksComponent, ObszaryZadanLista } from './tasks-main/tasks-main.component';
import { TaskAreasComponent } from './tasks-areas/task-areas.component';
import { TaskAreaComponent } from './tasks-area/task-area.component';
import { UserTaskComponent } from './user-task/user-task.component';

@NgModule({
  imports: [
    CommonModule
  ],
  
  providers: [{provide: TaskService, useClass: TaskTestService}],
  declarations: [
    UsersTasksComponent,
    TaskAreasComponent,
    ObszaryZadanLista,
    TaskAreaComponent,
    UserTaskComponent
  ],
  exports: [UsersTasksComponent],
  bootstrap: [UsersTasksComponent]
})
export class UsersTasksModule { }
