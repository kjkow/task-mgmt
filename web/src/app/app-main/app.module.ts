import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider } from "angular4-social-login";
import { SignInComponent } from '../sign-in/sign-in.component';

import { UsersTasksModule } from '../users-tasks/users-tasks.module';
import { UsersService } from '../sign-in/users.service';
import { UsersRestService } from '../sign-in/users.rest.service';
import { UsersMockService } from '../sign-in/users-mock.service';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("660414676955-26nqpv4smg9pe266iiiun9g21cqu4on9.apps.googleusercontent.com")
  }
]); //TODO: przenieść do pliku


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocialLoginModule.initialize(config),
    UsersTasksModule
  ],
  providers: [{provide: UsersService, useClass: UsersMockService}],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
