import { Component, OnDestroy, NgModule } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MyErrorStateMatcher } from '../service/errorStateMatcher.service';

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Channel } from '../../models/channel.class';
import {
  Firestore,
  collection,
  collectionData,
  setDoc,
  doc,
  getDoc,
  getDocs,
} from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { Observable, Subscription } from 'rxjs';

@NgModule({
  providers: [{ provide: ErrorStateMatcher, useClass: MyErrorStateMatcher }],
})
export class DialogDeleteChannelModule {}

@Component({
  selector: 'app-dialog-delete-channel',
  templateUrl: './dialog-delete-channel.component.html',
  styleUrls: ['./dialog-delete-channel.component.scss'],
})

export class DialogDeleteChannelComponent {
  formControl = new FormControl('', [Validators.required]);
  channelTypeControl = new FormControl('public');
  channel: Channel = new Channel();
  loading: boolean = false;
  matcher = new MyErrorStateMatcher();

  deleteChannel() {}
}


