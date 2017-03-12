import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgressbarModule } from 'ng2-bootstrap/progressbar';
import { CollapseModule } from 'ng2-bootstrap/collapse';

import { AppComponent } from './app.component';
import { ConsonantComponent } from './consonant.component';
import { BrowseComponent } from './browse.component';
import { GameComponent } from './game.component';
import { ResultComponent } from './result.component';
import { GameService } from './game.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ConsonantComponent,
    BrowseComponent,
    ResultComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ProgressbarModule.forRoot(),
    CollapseModule.forRoot(),
    AppRoutingModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
