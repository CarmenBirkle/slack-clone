import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: ChatComponent },
  { path: 'users', component: UsersComponent },
  { path: 'chat', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
