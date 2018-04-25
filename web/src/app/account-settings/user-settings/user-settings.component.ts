import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../sign-in/users.service';
import { User } from '../../sign-in/user';

@Component({
  selector: 'user-settings',
  template: `
  <div class="card">
    <h5 class="card-title">Ustawienia konta</h5>
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
      <button type="submit" class="btn btn-primary" (click)="save()">Zapisz</button>
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

  user = {
    email: "",
    name: "",
    notifications: false,
    daysBeforeDue: 0
  };

  save(){
    this.usersService.updateUserData(this.user);
  }

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.user = this.usersService.getUserInfo();
  }

}
