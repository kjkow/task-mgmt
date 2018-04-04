import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UsersService } from './sign-in/auth-service.service';

import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider } from "angular4-social-login";
import { TasksMainComponent, ObszaryZadanLista } from './tasks-main/tasks-main.component'
import { TaskService } from './tasks-main/services/task.service';
import { TaskTestService } from './tasks-main/services/task-test.service';
import { TaskAreasComponent } from './tasks-main/task-areas/task-areas.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("660414676955-26nqpv4smg9pe266iiiun9g21cqu4on9.apps.googleusercontent.com")
  }
]); //TODO: przenieść do pliku


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    TasksMainComponent,
    TaskAreasComponent,
    ObszaryZadanLista
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocialLoginModule.initialize(config)
  ],
  providers: [UsersService, {provide: TaskService, useClass: TaskTestService}],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
