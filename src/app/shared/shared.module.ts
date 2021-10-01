import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavigationLinkComponent } from './components/navigation-link/navigation-link.component';
import { ButtonComponent } from './components/button/button.component';
import { CoreModule } from 'app/core/core.module';

@NgModule({
  declarations: [
    NavigationComponent,
    NavigationLinkComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports: [
    NavigationComponent,
    ButtonComponent,
  ],
})
export class SharedModule {}