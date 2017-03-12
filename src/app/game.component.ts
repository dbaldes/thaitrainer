import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Consonant } from './consonant';
import { PHONETICS } from './consonants';
import { GameService, GameMode, GameState } from './game.service'

@Component({
  moduleId: module.id,
  templateUrl: './game.component.html',
  styleUrls: ['./consonant.component.css']
})
export class GameComponent implements OnInit {

  gameState: GameState;

  phonetics = PHONETICS;

  constructor(
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute) {

    this.gameState = gameService.gameState;
  }

  onChangeGameState(gameState: GameState) {
    this.gameState = gameState;
  }

  gameModeByParam(gtype: string): GameMode {
    return gtype == 'class' 
      ? GameMode.GUESS_CLASS
      : GameMode.GUESS_PHONETIC;
  }

  ngOnInit(): void {
     this.route.params
      .switchMap((params: Params) => 
          Promise.resolve(this.gameModeByParam(params['type']))
      )
      .subscribe(mode => this.gameService.start(mode));
     this.gameService.stateChanged.subscribe(
      (gameState) => {
        this.onChangeGameState(gameState);
      }
     );
  }

  public showScore(): void {
    this.router.navigate(['/result']);
  }

  public gameNext(): void {
    this.gameService.next();
  }

  guessClass(guess: string): void {
    this.gameService.guess(guess === this.gameState.consonant.charclass);
  }

  guessPhonetic(guess: string): void {
    this.gameService.guess(guess === this.gameState.consonant.roman.substring(0,1));
  }

}
