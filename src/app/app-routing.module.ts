import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsonantComponent } from './consonant.component';
import { BrowseComponent } from './browse.component';
import { GameComponent } from './game.component';

const routes: Routes = [
  { path: '', redirectTo: '/consonant/1', pathMatch: 'full' },
  { path: 'consonant/:id', component: BrowseComponent },
  { path: 'game/:type', component: GameComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
