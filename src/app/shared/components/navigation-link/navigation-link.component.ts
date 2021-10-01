import { AfterContentInit, Component, HostBinding, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-link',
  templateUrl: './navigation-link.component.html',
  styleUrls: ['./navigation-link.component.scss'],
})
export class NavigationLinkComponent implements AfterContentInit {

  @Input() icon = '';
  @Input() text = '';

  @Input()
  @HostBinding('class.--expandable')
  expandable = false;

  // Url to navigate to on click
  @Input() url?: string = undefined;

  // Controls default and active image filter application
  @Input() filterImage = true;
  
  isUrlActive = false;
  isExpanded = false;

  constructor(
    private router: Router,
  ) {
    this.router.events.subscribe({
      next: () => this.checkActive(),
    });
  }

  ngAfterContentInit(): void {
    this.checkActive();
  }

  checkActive() {
    this.isUrlActive = this.router.url == this.url;
  }

  close() {
    this.isExpanded = false;
  } 

  @HostListener('click')
  onClick() {
    // Toggle expansion
    if (this.expandable) {
      this.isExpanded = !this.isExpanded;
      return;
    }

    // Navigate URL
    if (this.url === undefined) return;
    if (this.url.startsWith('http'))
      window.open(this.url, '_blank');
    else this.router.navigate([this.url]);
  }
}
