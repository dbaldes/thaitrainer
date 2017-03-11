import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Consonant } from './consonant';
import { CONSONANTS } from './consonants';
import { GameService, GameMode, GameState } from './game.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ThaiTrainer';

  consonants: Consonant[] = CONSONANTS;

  constructor(
    private gameService: GameService,
    private router: Router) { }

  ngOnInit(): void {
  }

  gotoConsonant(id) {
    this.router.navigate(['/consonant', id]);
  }

  startGameClass() {
    this.gameService.start(GameMode.GUESS_CLASS);
  }

  startGamePhonetic() {
    this.gameService.start(GameMode.GUESS_PHONETIC);
  }

  browse() {
    let cid = this.gameService.getCurrent().id;
    this.gameService.stop();
    this.gotoConsonant(cid);
  }

  public gameState(): GameState {
    return this.gameService.gameState;
  }
}
