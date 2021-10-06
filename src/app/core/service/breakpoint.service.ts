import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Breakpoint } from '../model/breakpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {

  private breakpointSubject: ReplaySubject<Breakpoint>;
  private widthSubject: ReplaySubject<number>;

  get breakpoint$(): Observable<Breakpoint> {
    return this.breakpointSubject.asObservable().pipe(distinctUntilChanged());
  }

  get width$(): Observable<number> {
    return this.widthSubject.asObservable();
  }

  constructor() {
    this.breakpointSubject = new ReplaySubject();
    this.widthSubject = new ReplaySubject();
  }

  breakpointChanged(breakpoint: Breakpoint) {
    this.breakpointSubject.next(breakpoint);
  }

  widthChanged(width: number) {
    this.widthSubject.next(width);
  } 
}