import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../../sign-in/users.service';
import { User } from '../../sign-in/user';
import { UserService } from '../../sign-in/service/user.service';

@Component({
  selector: 'user-settings',
  template: `
  <div class="card">
    <h5 class="card-title">{{title}}</h5>
    <form>
      <div class="form-group row">
        <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
        <input type="text" 
               readonly 
               class="form-control-plaintext col-sm-10" 
               id="staticEmail"
               name="userEmail"
               [(ngModel)]="user.email">
      </div>
      <div class="form-group">
        <label for="userName">Nazwa użytkownika</label>
        <input id="userName" 
               type="text" 
               name="name" 
               class="form-control" 
               [(ngModel)]="user.name"
               maxlength="20">
      </div>
      <div class="form-group form-check">
        <input class="form-check-input" 
               id="emailNotifications" 
               type="checkbox" 
               [(ngModel)]="user.notifications"
               name="notifications">
        <label class="form-check-label" for="emailNotifications">Włączone powiadomienia e-mail</label>
      </div>
      <div class="form-group">
        <label for="daysBeforeNotify">Ile dni przed terminem wysłać powiadomienie</label>
        <input id="daysBeforeNotify" 
               type="number" 
               name="daysNotify" 
               [(ngModel)]="user.daysBeforeDue"
               class="form-control">
      </div>
      <button type="submit" class="btn btn-primary" (click)="save()">{{buttonMessage}}</button>
    </form>
  </div>
  `,
  styles: [`
  .card {
    max-width: 25rem;
    padding: 10px;
  }
  #daysBeforeNotify {
    max-width: 5em;
  }
  `]
})
export class UserSettingsComponent implements OnInit {

  @Input() title;
  @Input() buttonMessage;
  @Input() register;

  private newUser: boolean;

  private user = {
    email: "",
    name: "",
    notifications: false,
    daysBeforeDue: 0
  };

  save(){
    if(this.newUser){
      this.userService.registerUser(this.user);
    }else{
      //TODO: update user conf
    }
  }

  constructor(private userService: UserService) { }

  ngOnInit() {
    let register = (this.register == "true")
    if(register){
      let socialUser = this.userService.userInfo.socialUser;
      this.user.email = socialUser.email;
      this.user.name = socialUser.name;
      this.newUser = true;
    }
    if(this.userService.userInfo.user){
      let user = this.userService.userInfo.user;
      this.user.email = user.email;
      this.user.name = user.name
      this.user.notifications = user.notifications;
      this.user.daysBeforeDue = user.daysBeforeDue;
      this.newUser = false;
    }
  }

}
