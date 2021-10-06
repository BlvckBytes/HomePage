import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-submenu-content',
  templateUrl: './submenu-content.component.html',
  styleUrls: ['./submenu-content.component.scss'],
})
export class SubmenuContentComponent {

  // Corresponding menu title
  @Input() i18nTitle?: string = undefined;

  // Content can hide itself
  @HostBinding('class.hidden')
  hidden = false;
}
