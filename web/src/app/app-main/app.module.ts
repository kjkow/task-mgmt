import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider } from "angular4-social-login";
import { SignInComponent } from '../sign-in/sign-in.component';
import { UsersService } from '../sign-in/auth-service.service';
import { UsersTasksModule } from '../users-tasks/users-tasks.module';

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
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
