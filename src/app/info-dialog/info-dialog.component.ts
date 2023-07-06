
import { Component, ViewChild,ChangeDetectorRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';


import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent {



  title = 'EchoSphere';
  logo = 'assets/img/Logo.png';
  logoName = 'assets/img/LogoName.png';

  panelOpenState1 = false;
  panelOpenState2 = false;
  dataLoaded = false;
  isSidebarOpened: boolean = true;

  // @ViewChild('drawer') drawer!: MatDrawer;


  // allChannels: any = [];
  // isMobileView = true;

  /**
   * Constructor of AppComponent
  //  @param {ChangeDetectorRef} cdr 
   * - Injected service for managing change detection.
   */
  // constructor(
  //   private cdr: ChangeDetectorRef,
  //   private dialog: MatDialog,
  //   private firestore: Firestore,

  //   private cd: ChangeDetectorRef,
  
  // ) {}

  // ngOnInit(): void {
  //   this.readData();
  // }
  /**
   * Start the loading animation, from the loadingService
   */



  /**
   * Stop the loading animation, from the loadingService
   */
 

  // readData() {
   
  //   let changes;
  //   const collectionRef = collection(this.firestore, 'channels');
  //   onSnapshot(collectionRef, (snapshot) => {
  //     changes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  //     // Sortiere das Array nach dem channelName, wenn das Feld vorhanden ist
  //     changes.sort((a: any, b: any) => {
  //       if (a.channelName && b.channelName) {
  //         return a.channelName.localeCompare(b.channelName);
  //       }
  //       return 0;
  //     });

  //     this.allChannels = changes;

  //     //TODO: console.log entfernen
  //     console.log('changes', changes);
  //     this.dataLoaded = true;
     
  //   });
  // }

  /**
   * Angular's AfterViewInit lifecycle hook, executes after the component's view (and child views) has been initialized.
   * Here, we're setting up the viewport checker and event listener for window resizing.
   */

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     this.checkViewport();
  //     this.cdr.detectChanges();

  //     window.addEventListener('resize', () => {
  //       this.checkViewport();
  //       this.cdr.detectChanges();
  //     });
  //   }, 0);
  // }

  // ngAfterViewChecked() {
  //   this.cd.detectChanges();
  // }

  /**
   * This method checks the viewport width to decide the mode of the drawer.
   * If the width is less than or equal to 768px, it assumes that the user is in mobile view and sets the drawer mode accordingly.
   */
  // checkViewport() {
  //   this.isMobileView = window.innerWidth <= 768; // TODO Adjust the breakpoint as needed
  //   this.drawer.opened = !this.isMobileView;
  //   this.isSidebarOpened = !this.isMobileView;
  //   this.drawer.mode = this.isMobileView ? 'over' : 'side';
  //   console.log('isSidebarOpened', this.isSidebarOpened);
  // }

  /**
   * This method is called when a link in the sidenav is clicked.
   * If the user is in mobile view, it will close the sidenav.
   */
  // onLinkClicked() {
  //   if (this.isMobileView) {
  //     this.drawer.close();
  //   }
  // }

  // onToggleSidebar() {
  //   this.drawer.toggle();
  //   this.isSidebarOpened = !this.isSidebarOpened;
  // }

  // openDialog(
  //   enterAnimationDuration: string,
  //   exitAnimationDuration: string
  // ): void {
  //   this.dialog.open(DialogAddChannelComponent, {
  //     width: '250px',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  // }

 

}



