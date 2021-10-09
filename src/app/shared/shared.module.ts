import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './component/navigation/navigation.component';
import { NavigationLinkComponent } from './component/navigation-link/navigation-link.component';
import { ButtonComponent } from './component/button/button.component';
import { CoreModule } from 'app/core/core.module';
import { SubmenuSliderComponent } from './component/submenu-slider/submenu-slider.component';
import { SubmenuContentComponent } from './component/submenu-content/submenu-content.component';
import { TextboxComponent } from './component/textbox/textbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  declarations: [
    NavigationComponent,
    NavigationLinkComponent,
    ButtonComponent,
    SubmenuSliderComponent,
    SubmenuContentComponent,
    TextboxComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
  ],
  exports: [
    NavigationComponent,
    ButtonComponent,
    SubmenuSliderComponent,
    SubmenuContentComponent,
    TextboxComponent,
    FooterComponent,
  ],
})
export class SharedModule {}