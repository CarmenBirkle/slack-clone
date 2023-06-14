import {
  Component,
  ViewChild,
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

  /**
   * Constructor of AppComponent
   * @param {ChangeDetectorRef} cdr - Injected service for managing change detection.
   */
  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Angular's AfterViewInit lifecycle hook, executes after the component's view (and child views) has been initialized.
   * Here, we're setting up the viewport checker and event listener for window resizing.
   */
  ngAfterViewInit() {
    this.checkViewport();
    this.cdr.detectChanges();

    window.addEventListener('resize', () => {
      this.checkViewport();
      this.cdr.detectChanges();
    });
  }

  /**
   * This method checks the viewport width to decide the mode of the drawer.
   * If the width is less than or equal to 768px, it assumes that the user is in mobile view and sets the drawer mode accordingly.
   */
  checkViewport() {
    this.isMobileView = window.innerWidth <= 768; // TODO Adjust the breakpoint as needed
    this.drawer.opened = !this.isMobileView;
    this.drawer.mode = this.isMobileView ? 'over' : 'side';
  }

  /**
   * This method is called when a link in the sidenav is clicked.
   * If the user is in mobile view, it will close the sidenav.
   */
  onLinkClicked() {
    if (this.isMobileView) {
      this.drawer.close(); // Close the navbar after clicking a link in the mobile view
    }
  }
}
