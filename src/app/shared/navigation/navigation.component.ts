import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { burgerAnimations, contentAnimations } from './navigation.animations';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [
    ...burgerAnimations(250),
    ...contentAnimations(250)
  ]
})
export class NavigationComponent {

  // Content wrapper class, active when no animations occur
  private contentClass = 'links__content--animdone';
  isNavOpen = false;

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  navState() {
    // Translate nav state to trigger name
    return this.isNavOpen ? 'open' : 'closed';
  }

  navStart(event: any) {
    event.element.classList.remove(this.contentClass);
  }

  navEnd(event: any) {
    event.element.classList.add(this.contentClass);
  } 
}
