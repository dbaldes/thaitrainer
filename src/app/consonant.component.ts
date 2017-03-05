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

  constructor(
    private consonantService: ConsonantService,
    private route: ActivatedRoute,
    private location: Location) { }

  setConsonant(consonant: Consonant) {
    this.consonant = consonant;
    this.characterClass = 
        consonant.charclass == 'l'
          ? 'low' 
          : consonant.charclass == 'm'
            ? 'medium'
            : 'high';
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.consonantService.getConsonant(+params['id']))
      .subscribe(consonant => this.setConsonant(consonant));
  }

  goBack(): void {
    this.location.back();
  }
}
