import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './components/start-page/start-page.component';

export enum Paths {
  start = 'start',
}

const routes: Routes = [
  { path: '', redirectTo: Paths.start, pathMatch: 'full' },
  { path: Paths.start, component: StartPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
