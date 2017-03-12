import { Component, OnInit } from '@angular/core';

import { GameService, GameState } from './game.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ThaiTrainer';

  gameState: GameState;

  public navCollapsed: boolean = true;

  constructor(private gameService: GameService) {
    this.gameState = gameService.gameState;  
  }
  
  ngOnInit(): void {
    this.gameService.stateChanged.subscribe(
      (gameState) => {
         this.gameState = gameState;
      }
    );
  }
}
