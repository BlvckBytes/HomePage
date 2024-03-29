import { AfterViewInit, Component, DoCheck, HostBinding, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, merge } from 'rxjs';
import { distinctUntilChanged, skip, startWith } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss'],
})
export class TextboxComponent implements AfterViewInit, DoCheck, OnDestroy{

  @Input() placeholder?: string = undefined;
  @Input() icon?: string = undefined;
  @Input() type = 'text';
  @Input() control!: FormControl;

  @HostBinding('class.--large')
  get isTextarea() {
    return this.type === 'textarea';
  }

  @HostBinding('class.--has-content')
  hasContent = false;

  @HostBinding('class.--valid')
  isValid = false;

  @HostBinding('class.--invalid')
  isInvalid = false;

  private subs = new SubSink();
  private touched$ = new BehaviorSubject(false);

  ngDoCheck() {
    // Check if touched has changed
    if (this.touched$.value !== this.control.touched)
      this.touched$.next(true);
  }

  ngAfterViewInit() {
    this.subs.sink = merge(
      // Only call when it changed from it's default value
      this.touched$.pipe(
        startWith(false),
        distinctUntilChanged(),
        skip(1),
      ),
      this.control.valueChanges,
    ).subscribe(() => this.updateModifiers());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private updateModifiers() {
    // Neither empty nor null
    this.hasContent = this.control.value !== '' && this.control.value !== null;

    // Needs to be touched or have content in order to be applied
    this.isValid = (this.control.touched || this.hasContent) && this.control.valid;
    this.isInvalid = (this.control.touched || this.hasContent) && !this.control.valid;
  }
}
