import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { providers as CoreProviders } from '@bbd/core';
import { CoreModule } from './core/core.module';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageProjectsComponent } from './pages/page-projects/page-projects.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    PageProjectsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
  ],
  providers: [
    ...CoreProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
