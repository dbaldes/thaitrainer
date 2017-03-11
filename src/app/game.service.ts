import { Injectable, EventEmitter } from '@angular/core';

import { Consonant } from './consonant';
import { CONSONANTS } from './consonants';

export const enum GameMode {
  BROWSE,
  GUESS_CLASS,
  GUESS_PHONETIC
}

export class GameState {

  mode: GameMode = GameMode.BROWSE;

  finished = false;
  maxGuesses = CONSONANTS.length;
  guesses = 0;
  correctGuesses = 0;
  guessing = false;
  wrong = false;
  currentPosition = 0;
  consonant: Consonant = CONSONANTS[0];
  
  reset(): void {
    this.finished = false;
    this.guesses = 0;
    this.correctGuesses = 0;
    this.guessing = false;
    this.wrong = false;
    this.currentPosition = 0;
    this.mode = GameMode.BROWSE;
  }

  score(): number {
    return this.guesses == 0 ? 0 : this.correctGuesses / this.guesses;
  }

  progress(): number {
    return this.guesses / this.maxGuesses;
  }

  public isGuessClass(): boolean {
    return this.mode == GameMode.GUESS_CLASS;
  }

  public isGuessPhonetic(): boolean {
    return this.mode == GameMode.GUESS_PHONETIC;
  }

  public isRunning(): boolean {
    return this.mode != GameMode.BROWSE;
  }
}

@Injectable()
export class GameService {
  consonants: Consonant[] = CONSONANTS.slice(0);
  stateChanged: EventEmitter<GameState> = new EventEmitter<GameState>();
  gameState: GameState = new GameState();

  currentPosition: number = 0;

  start(mode: GameMode): void {
    this.consonants = CONSONANTS.slice(0);
    this.gameState.reset();
    this.gameState.mode = mode;
    if (this.gameState.mode != GameMode.BROWSE) {
      this.shuffle(this.consonants); 
      this.gameState.guessing = true;
    }
    this.gameState.consonant = this.consonants[this.gameState.currentPosition];
    this.stateChanged.emit(this.gameState);
  }

  stop(): void {
    this.start(GameMode.BROWSE);
  }

  next(): void {
    ++this.gameState.currentPosition;
    if (this.gameState.currentPosition >= this.consonants.length) {
      this.gameState.currentPosition = 0;
    }
    this.gameState.consonant = this.consonants[this.gameState.currentPosition];
    if (this.gameState.mode != GameMode.BROWSE) {
      this.gameState.guessing = true;
    }
    this.stateChanged.emit(this.gameState);
  }

  prev(): void {
    --this.gameState.currentPosition;
    if (this.gameState.currentPosition < 0) {
      this.gameState.currentPosition = this.consonants.length - 1;
    }
    this.gameState.consonant = this.consonants[this.gameState.currentPosition];
    if (this.gameState.mode != GameMode.BROWSE) {
      this.gameState.guessing = true;
    }
    this.stateChanged.emit(this.gameState);
  }

  getCurrent(): Consonant {
    return this.consonants[this.gameState.currentPosition];
  }

  getAll(): Consonant[] {
    return this.consonants;
  }

  guess(right: boolean): void {
    ++this.gameState.guesses;
    if (right) {
      ++this.gameState.correctGuesses;
    } 
    this.gameState.guessing = false;
    this.gameState.wrong = !right;
    if (this.gameState.guesses >= this.gameState.maxGuesses) {
      this.gameState.finished = true;
    }
    this.stateChanged.emit(this.gameState);
  }

  getConsonant(id: number): Promise<Consonant> {
    return Promise.resolve(CONSONANTS.find(consonant => consonant.id === id));
  }


  shuffle(a: Consonant[]): void {
    for(let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
  }
}
