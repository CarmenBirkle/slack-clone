
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



@Component({
  selector: 'app-dialog-edit-channel',
  templateUrl: './dialog-edit-channel.component.html',
  styleUrls: ['./dialog-edit-channel.component.scss'],
})
export class DialogEditChannelComponent {
  formControl = new FormControl('', [Validators.required]);
  channelTypeControl = new FormControl('public');
  channel: Channel = new Channel();
  loading: boolean = false;
  matcher = new MyErrorStateMatcher();

  private subscriptions: Subscription[] = [];

  saveChannel() {}
}
