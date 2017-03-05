import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsonantComponent } from './consonant.component';

const routes: Routes = [
  { path: '', redirectTo: '/consonant/1', pathMatch: 'full' },
  { path: 'consonant/:id', component: ConsonantComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
