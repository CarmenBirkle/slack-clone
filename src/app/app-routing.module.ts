import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; 

import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { InfoDirektnachrichtenComponent } from './info-direktnachrichten/info-direktnachrichten.component';
import { InfoBenachrichtigungenComponent } from './info-benachrichtigungen/info-benachrichtigungen.component';
import { InfoStatusComponent } from './info-status/info-status.component';
import { InfoImpressumComponent } from './info-impressum/info-impressum.component';
import { InfoErinnerungenComponent } from './info-erinnerungen/info-erinnerungen.component';
import { BookmarkComponent } from './bookmark/bookmark.component';

const routes: Routes = [
  { path: '',
    //canActivate: [AuthGuard],
    component: WelcomeComponent },
  {
    path: 'users',
    //canActivate: [AuthGuard], 
    component: UsersComponent,
  },
  {
    path: 'chat',
    //canActivate: [AuthGuard],
    component: ChatComponent,
  },
  {
    path: 'chat/:id',
    //canActivate: [AuthGuard], 
    component: ChatComponent,
  },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  //TODO: Add routes for the new components when they are changed to english 
  { path: 'direktnachrichten', component: InfoDirektnachrichtenComponent },
  { path: 'benachrichtigungen', component: InfoBenachrichtigungenComponent },
  { path: 'status', component: InfoStatusComponent },
  { path: 'erinnerungen', component: InfoErinnerungenComponent },
  { path: 'impressum', component: InfoImpressumComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
