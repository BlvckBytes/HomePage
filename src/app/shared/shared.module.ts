import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationLinkComponent } from './navigation-link/navigation-link.component';

@NgModule({
  declarations: [
    NavigationComponent,
    NavigationLinkComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class SharedModule { }
