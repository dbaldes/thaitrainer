import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Consonant } from './consonant';
import { GameService, GameMode, GameState } from './game.service'

@Component({
  moduleId: module.id,
  selector: 'display-consonant',
  templateUrl: './consonant.component.html',
  styleUrls: ['./consonant.component.css']
})
export class ConsonantComponent implements OnInit {

  @Input()
  consonant: Consonant;

  characterClass: string;

  gameState: GameState;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private location: Location) {

    this.gameState = gameService.gameState;
  }

  setConsonant(consonant: Consonant) {
    this.consonant = consonant;
    this.characterClass = 
        consonant.charclass == 'l' ? 'low' 
          : consonant.charclass == 'm' ? 'middle'
            : 'high';
  }


  onChangeGameState(gameState: GameState) {
    this.gameState = gameState;
    this.setConsonant(this.gameState.consonant);
  }

  ngOnInit(): void {
     this.route.params
      .switchMap((params: Params) => this.gameService.getConsonant(+params['id']))
      .subscribe(consonant => this.setConsonant(consonant));
     this.gameService.stateChanged.subscribe(
      (gameState) => {
        this.onChangeGameState(gameState);
      }
     );
  }

  public gameNext(): void {
    this.gameService.next();
  }

  guessClass(guess: string): void {
    this.gameService.guess(guess === this.consonant.charclass);
  }

  guessPhonetic(guess: string): void {
    this.gameService.guess(guess === this.consonant.roman.substring(0,1));
  }

  goBack(): void {
    this.location.back();
  }
}
