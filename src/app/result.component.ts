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

  constructor( private gameService: GameService) {
    this.gameState = gameService.gameState;
  }
}
