import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Consonant } from './consonant';
import { ConsonantService } from './consonant.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ThaiTrainer';

  consonants: Consonant[] = [];

  constructor(
    private consonantService: ConsonantService,
    private router: Router) { }

  ngOnInit(): void {
    this.consonantService.getConsonants()
        .then(cs => this.consonants = cs);
  }

  gotoConsonant(id) {
    this.router.navigate(['/consonant', id]);
  }

}
