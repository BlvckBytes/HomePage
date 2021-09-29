import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationLinkComponent } from './navigation-link/navigation-link.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    NavigationComponent,
    NavigationLinkComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavigationComponent,
    ButtonComponent
  ]
})
export class SharedModule { }
