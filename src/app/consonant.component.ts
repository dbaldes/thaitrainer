import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Consonant } from './consonant';
import { ConsonantService } from './consonant.service'

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

  guessingPhonetic = false;
  guessingClass = true;

  showClass = true;
  showPhonetic = true;
 
  wrongClass = false;
  rightClass = false;

  wrongPhonetic = false;
  rightPhonetic = false;

  constructor(
    private consonantService: ConsonantService,
    private route: ActivatedRoute,
    private location: Location) { }

  setConsonant(consonant: Consonant) {
    this.showClass = !this.guessingClass;
    this.showPhonetic = !this.guessingPhonetic;
    this.wrongClass = false;
    this.rightClass = false;
    this.wrongPhonetic = false;
    this.rightPhonetic = false;

    this.consonant = consonant;
    this.characterClass = 
        consonant.charclass == 'l' ? 'low' 
          : consonant.charclass == 'm' ? 'middle'
            : 'high';
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.consonantService.getConsonant(+params['id']))
      .subscribe(consonant => this.setConsonant(consonant));
  }


  guessClass(guess: string): void {
    if (guess === this.consonant.charclass) {
      this.rightClass = true;
    } else {
      this.wrongClass = true;
    }  
    this.showClass = true;
  }

  guessPhonetic(guess: string): void {
    if (guess === this.consonant.roman.substring(0,1)) {
      this.rightPhonetic = true;
    } else {
      this.wrongPhonetic = true;
    }
    this.showPhonetic = true;
  }

  goBack(): void {
    this.location.back();
  }
}
