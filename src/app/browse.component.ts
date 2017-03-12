import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Consonant } from './consonant';
import { CONSONANTS } from './consonants';
import { GameService } from './game.service';

@Component({
  moduleId: module.id,
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  currentConsonant: Consonant;
  consonants: Consonant[] = CONSONANTS;

  constructor(
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  setCurrentConsonant(consonant: Consonant) {
    this.currentConsonant = consonant;
  }

  ngOnInit(): void {
     this.route.params
      .switchMap((params: Params) => this.gameService.getConsonant(+params['id']))
      .subscribe(consonant => this.setCurrentConsonant(consonant));
  }

  next(): void {
    let id = this.currentConsonant.id + 1;
    if (id > 44) { id = 1; }
    this.gotoConsonant(id);
  }

  prev(): void {
    let id = this.currentConsonant.id - 1;
    if (id == 0) { id = 44; }
    this.gotoConsonant(id);
  }

  gotoConsonant(id) {
    this.router.navigate(['/consonant', id]);
  }

}
