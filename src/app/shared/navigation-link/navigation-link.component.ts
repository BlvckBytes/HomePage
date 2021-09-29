import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-link',
  templateUrl: './navigation-link.component.html',
  styleUrls: ['./navigation-link.component.scss']
})
export class NavigationLinkComponent implements OnInit {

  @Input() icon = ''
  @Input() text = ''
  @Input() url = ''

  active = false

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe({
      next: () => this.checkActive()
    })
  }

  checkActive() {
    this.active = this.router.url == this.url
  } 

  ngOnInit(): void {
    this.checkActive()
  }

  @HostListener('click')
  onClick() {
    if (this.url === '') return;
    if (this.url.startsWith("http"))
      window.open(this.url, '_blank');
    else this.router.navigate([this.url]);
  }
}
