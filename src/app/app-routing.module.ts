import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageImprintComponent } from './pages/page-imprint/page-imprint.component';
import { PageProjectsComponent } from './pages/page-projects/page-projects.component';

const routes: Routes = [
  { path: 'projects', component: PageProjectsComponent },
  { path: 'home', component: PageHomeComponent },
  { path: 'imprint', component: PageImprintComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
