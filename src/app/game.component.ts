import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Consonant } from './consonant';
import { PHONETICS } from './consonants';
import { GameService, GameMode, GameState } from './game.service'

@Component({
  moduleId: module.id,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  phonetics = PHONETICS;

  gameState: GameState;
  showResult = false;

  private gameStateSubscription;

  constructor(
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute) {

    this.gameState = gameService.gameState;
  }

  onChangeGameState(gameState: GameState) {
    this.gameState = gameState;
    if (gameState.mode == GameMode.BROWSE) {
      this.router.navigate(['/']);
    }
  }

  gameModeByParam(gtype: string): GameMode {
    return gtype == 'class' 
      ? GameMode.GUESS_CLASS
      : gtype == 'phonetic' 
        ? GameMode.GUESS_PHONETIC
        : GameMode.BROWSE;
  }

  ngOnInit(): void {
     this.route.params
      .switchMap((params: Params) => 
          Promise.resolve(this.gameModeByParam(params['type']))
      )
      .subscribe(mode => this.gameService.start(mode));
     this.gameStateSubscription = this.gameService.stateChanged.subscribe(
      (gameState) => {
        this.onChangeGameState(gameState);
      }
     );
  }

  stop(): void {
    this.gameService.stop();
  }
  
  again(): void {
    this.showResult = false;
    this.gameService.start(this.gameState.mode);
  }

  ngOnDestroy(): void {
    this.gameStateSubscription.unsubscribe();
    this.gameService.stop();
  }

  public showScore(): void {
    this.showResult = true;
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
