import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
})
export class PageHomeComponent {
  
  myAge: number;
  contactForm: FormGroup;

  // #region Form control member getters
  get fcName() {
    return this.getFC('name');
  }

  get fcMail() {
    return this.getFC('mail');
  }

  get fcSubject() {
    return this.getFC('subject');
  }

  get fcMessage() {
    return this.getFC('message');
  }
  // #endregion

  constructor(
    private fb: FormBuilder,
  ) {
    this.myAge = new Date().getFullYear() - 2001;
    this.contactForm = fb.group({
      name: ['', Validators.required],
      mail: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  contactSubmit() {
    this.contactForm.reset();
    window.alert('Actual sending is to be implemented...');
  }

  private getFC(name: string): FormControl {
    return this.contactForm.get(name) as FormControl;
  }
}
