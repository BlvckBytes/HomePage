import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageProjectsComponent } from './pages/page-projects/page-projects.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageImprintComponent } from './pages/page-imprint/page-imprint.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    PageProjectsComponent,
    PageImprintComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
