import { AfterContentInit, AfterViewChecked, ChangeDetectorRef, Component, ContentChildren, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BreakpointService } from '@bbd/core';
import { SubmenuContentComponent } from '../submenu-content/submenu-content.component';

@Component({
  selector: 'app-submenu-slider',
  templateUrl: './submenu-slider.component.html',
  styleUrls: ['./submenu-slider.component.scss'],
})
export class SubmenuSliderComponent implements AfterViewChecked, AfterContentInit {

  // Get all submenus passed by ng-content
  @ContentChildren(SubmenuContentComponent)
  content!: QueryList<SubmenuContentComponent>;

  // Access the slider guide for movements,
  // and the titles for offset calculation
  @ViewChild('sliderGuide') sliderGuide!: ElementRef;
  @ViewChildren('sliderTitle') sliderTitles!: QueryList<ElementRef>;
  sliderTransform = '';

  // List of available titles to choose from
  titles: ActivatableTitle[] = [];

  constructor(
    private bpService: BreakpointService,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngAfterContentInit(): void {
    // Map title property of content childs to activatable titles
    this.titles = this.content.map((it, ind) => {
      it.hidden = ind != 0; // Initial hidden state
      
      return {
        state: ind == 0,
        owner: it,
        title: undefined,
      };
    });
  }

  ngAfterViewChecked(): void {
    // Set title references, now that they've been rendered
    this.titles.forEach((it, ind) => it.element = this.sliderTitles.get(ind));

    // Always update slider position on viewport width change
    let first = true;
    this.bpService.width$
      .subscribe(() => {
        this.moveSlider(this.titles.find(it => it.state)!);

        // Initial emit is instantaneous, thus call cd
        if (first) {
          this.cdRef.detectChanges();
          first = false;
        }
      });
  }

  private moveSlider(title: ActivatableTitle) {
    // Calculate y-offset of clicked element from top
    const sliderBox = this.sliderGuide.nativeElement.getBoundingClientRect();
    const clickedBox = title.element!.nativeElement.getBoundingClientRect();
    const vert = sliderBox.width < sliderBox.height;

    // Vertical movement
    if (vert) {
      // Get computed height without padding and padding top
      const clickedStyles = getComputedStyle(title.element!.nativeElement);
      const ptop = parseFloat(clickedStyles.paddingTop);
      const pheight = clickedBox.height - ptop - parseFloat(clickedStyles.paddingBottom);

      // Apply translate on y-axis to y-center of clicked box
      const yOff = clickedBox.top - sliderBox.top + ptop + pheight / 2;
      this.sliderTransform = `translateY(calc(${Math.floor(yOff)}px - 50%))`;
    }

    // Horizontal movement
    else {
      // Apply translate on x-axis to x-center of clicked box
      const xOff = clickedBox.left - sliderBox.left + clickedBox.width / 2;
      this.sliderTransform = `translateX(calc(${Math.floor(xOff)}px - 50%))`;
    }
  }

  // Menu has been chosen by a click on the title
  menuChoose(title: ActivatableTitle) {
    // Move the slider to the chosen element
    this.moveSlider(title);

    // Set selection
    this.titles.forEach(it => {
      const active = it === title;
      it.state = active;
      it.owner.hidden = !active;
    });
  }
}

// Internal datastructure for a title which can be activated,
// containing it's text, activation state and owning submenu
interface ActivatableTitle {
  
  state: boolean;
  owner: SubmenuContentComponent;
  element?: ElementRef;
}