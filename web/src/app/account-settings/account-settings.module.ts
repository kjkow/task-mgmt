import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [UserSettingsComponent],
  declarations: [UserSettingsComponent],
  bootstrap: [UserSettingsComponent]
})
export class AccountSettingsModule { }
