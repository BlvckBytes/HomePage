import { Component } from '@angular/core';
import { LanguageService } from '@bbd/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

  currYear: number;

  constructor(
    public langService: LanguageService,
  ) {
    this.currYear = new Date().getFullYear();
  }
}
