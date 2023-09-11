import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; 

import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { InfoStatusComponent } from './info-status/info-status.component';
import { InfoImprintComponent } from './info-imprint/info-imprint.component';
import { InfoSetUpRemindersComponent } from './info-set-up-reminders/info-set-up-reminders.component'; 
import { BookmarkComponent } from './bookmark/bookmark.component';
import { InfoDirectMessagesComponent } from './info-direct-messages/info-direct-messages.component';
import { InfoConfigureNotificationsComponent } from './info-configure-notifications/info-configure-notifications.component';




const routes: Routes = [
  {
    path: '',
    //canActivate: [AuthGuard],
    component: WelcomeComponent,
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    component: UsersComponent,
  },
  /* {
    path: 'chat',
    canActivate: [AuthGuard],
    component: ChatComponent,
  },*/
  {
    path: 'chat/thread',
    canActivate: [AuthGuard],
    component: ChatComponent,
  },
  {
    path: 'chat/:id',
    canActivate: [AuthGuard],
    component: ChatComponent,
  },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  //TODO: Add routes for the new components when they are changed to english
  { path: 'directMessages', component: InfoDirectMessagesComponent },
  {
    path: 'configureNotifications',
    component: InfoConfigureNotificationsComponent,
  },
  { path: 'status', component: InfoStatusComponent },
  { path: 'set-up-reminders', component: InfoSetUpRemindersComponent },
  { path: 'imprint', component: InfoImprintComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
