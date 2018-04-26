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
import { TaskRestService } from './tasks-services/task-rest.service';
import { ProjectsMainComponent } from '../users-projects/projects-main/projects-main.component';
import { ProjectsListComponent } from '../users-projects/projects-list/projects-list.component';
import { ProjectsService } from '../users-projects/services/projects.service';
import { ProjectsTestService } from '../users-projects/services/projects-test.service';
import { ProjectFormComponent } from '../users-projects/project-form/project-form.component';
import { ProjectsStagesComponent } from '../users-projects/projects-stages/projects-stages.component';
import { ProjectsRestService } from '../users-projects/services/projects-rest.service';
import { TaskSearchComponent } from './task-search/task-search.component';
import { AccountSettingsModule } from '../account-settings/account-settings.module';
import { UserSettingsComponent } from '../account-settings/user-settings/user-settings.component';
import { DragDropDirectiveModule} from "angular4-drag-drop";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccountSettingsModule,
    DragDropDirectiveModule
  ],
  
  providers: [
    {provide: TaskService, useClass: TaskTestService},
    {provide: ProjectsService, useClass: ProjectsRestService}
  ],
  declarations: [
    UsersTasksComponent,
    TaskAreasComponent,
    TaskAreaComponent,
    UserTaskComponent,
    TaskFormComponent,
    AreasPipe,
    TaskNavigationComponent,
    ProjectsMainComponent,
    ProjectsListComponent,
    ProjectFormComponent,
    ProjectsStagesComponent,
    TaskSearchComponent    
  ],
  exports: [UsersTasksComponent],
  bootstrap: [UsersTasksComponent]
})
export class UsersTasksModule { }
