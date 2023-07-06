import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent {
  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    pin: new FormControl(''),
  });

}
