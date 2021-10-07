import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {

  @Input() text = 'Button';
  @Input() icon?: string = undefined;
  @Input() url?: string = undefined;
  @Input() submit = false;

  @Input()
  @HostBinding('class.--disabled')
  disabled = false;

  @Input()
  @HostBinding('class.--filled')
  filled = true;

  constructor(
    private router: Router,
  ) {}

  @HostListener('click')
  onClick() {
    if (!this.url) return;
    
    if (this.url.startsWith('http'))
      window.open(this.url, '_blank');

    else if (this.url.startsWith('#'))
      document.querySelector(this.url)?.scrollIntoView();

    else this.router.navigate([this.url]);
  }
}
