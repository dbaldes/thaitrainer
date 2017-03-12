import { Component } from '@angular/core';

import { GameService, GameState } from './game.service'

@Component({
  moduleId: module.id,
  selector: 'display-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {

  gameState: GameState;

  RATINGS: string[] = [
    "Did you even try?",
    "There's a long way ahead of you.",
    "You can do better than that!",
    "You are on the right path.",
    "Well done!",
    "Simply perfect!"
  ];

  constructor( private gameService: GameService) {
    this.gameState = gameService.gameState;
  }

  rating(): string {
    let score = this.gameState.score();
    return this.RATINGS[Math.floor((this.RATINGS.length - 1) * score)];
  }
}
