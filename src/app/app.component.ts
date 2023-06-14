import {
  Component,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  panelOpenState = false;

  @ViewChild('drawer') drawer!: MatDrawer;

  isMobileView = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.checkViewport();
    this.cdr.detectChanges();

    window.addEventListener('resize', () => {
      this.checkViewport();
      this.cdr.detectChanges();
    });
  }

  checkViewport() {
    this.isMobileView = window.innerWidth <= 768; // TODO Adjust the breakpoint as needed

    // Set the attributes based on viewport
    this.drawer.opened = !this.isMobileView;
    this.drawer.mode = this.isMobileView ? 'over' : 'side';
  }

  onLinkClicked() {
    if (this.isMobileView) {
      this.drawer.close(); // Close the navbar after clicking a link in the mobile view
    }
  }
}
