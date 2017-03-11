import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsonantComponent } from './consonant.component';
import { ResultComponent } from './result.component';

const routes: Routes = [
  { path: '', redirectTo: '/consonant/1', pathMatch: 'full' },
  { path: 'consonant/:id', component: ConsonantComponent },
  { path: 'result', component: ResultComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
