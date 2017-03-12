import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Consonant } from './consonant';

@Component({
  moduleId: module.id,
  selector: 'display-consonant',
  templateUrl: './consonant.component.html',
  styleUrls: ['./consonant.component.css']
})
export class ConsonantComponent {

  @Input()
  consonant: Consonant;
  @Input()
  gameClass = false;
  @Input()
  gamePhonetic = false;
  @Input()
  gameWrong = false;
  @Input()
  showPhonetic = true;
  @Input()
  showClass = true;

  getCharacterClass(): string {
    return this.consonant.charclass == 'l' ? 'low' 
            : this.consonant.charclass == 'm' ? 'middle'
            : 'high';
  }

}
