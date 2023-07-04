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
    console.log(this.visible);
  }

  openDirektnachrichten() {
    this.dialog.open(InfoDirektnachrichtenComponent, {
      height: '85%',
      width: '50%',
    });
  }
  openBenachrichtigungen() {
    this.dialog.open(InfoBenachrichtigungenComponent, {
      height: '82%',
      width: '50%',
    });
  }
  openStatus() {
    this.dialog.open(InfoStatusComponent, {
      height: '82%',
      width: '50%',
    });
  }
  openErinnerungen() {
    this.dialog.open(InfoErinnerungenComponent, {
      height: '82%',
      width: '50%',
    });
  }
  openImpressum() {
    this.dialog.open(InfoImpressumComponent, {
      height: '82%',
      width: '50%',
    });
  }
  closeDialog() {
    this.switchVisible()
  }
}
  

 