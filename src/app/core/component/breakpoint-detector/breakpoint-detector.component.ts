import { AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { BreakpointService } from '@bbd/core';
import { Breakpoint } from 'app/core/model/breakpoint.enum';

@Component({
  selector: 'app-breakpoint-detector',
  templateUrl: './breakpoint-detector.component.html',
  styleUrls: ['./breakpoint-detector.component.scss'],
})
export class BreakpointDetectorComponent implements AfterViewInit {

  @ViewChildren('detector') detectors!: QueryList<ElementRef>;
  bpClasses: Record<string, number> = {};

  constructor(
    private bpService: BreakpointService,
  ) {
    // Iterate all numeric enum keys and map the
    // corresponding class name to them
    Object.keys(Breakpoint)
      .map(key => Number(key))
      .forEach(num => {
        if (isNaN(num)) return;
        this.bpClasses[`bp__${Breakpoint[num].toLocaleLowerCase()}--active`] = num;
      });
  }

  ngAfterViewInit(): void {
    // Initial call
    this.detectBreakpoint();
  }

  // Call every time the resize event happens globally
  @HostListener('window:resize')
  private detectBreakpoint() {
    // Fire width change
    this.bpService.widthChanged(window.innerWidth);

    // Use some to stop after first visible element
    this.detectors.some(detector => {
      const visible = getComputedStyle(detector.nativeElement).display !== 'none';

      // Visible, emit new breakpoint change
      if (visible) {
        const bp = this.bpClasses[detector.nativeElement.classList[0]];
        this.bpService.breakpointChanged(bp);
      }

      return visible;
    });
  }
}