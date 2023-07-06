import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { InfoDirektnachrichtenComponent } from '../info-direktnachrichten/info-direktnachrichten.component';
import { InfoImpressumComponent } from '../info-impressum/info-impressum.component';
import { InfoBenachrichtigungenComponent } from '../info-benachrichtigungen/info-benachrichtigungen.component';
import { InfoStatusComponent } from '../info-status/info-status.component';
import { InfoErinnerungenComponent } from '../info-erinnerungen/info-erinnerungen.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']

  
})
export class InfoComponent {

  visible = false;

  constructor(public dialog: MatDialog) {}

  switchVisible() {
    this.visible = !this.visible
  }

  
  closeDialog() {
    this.switchVisible()
  }
}
  

 