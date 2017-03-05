import { Injectable } from '@angular/core';

import { Consonant } from './consonant';
import { CONSONANTS } from './consonants';

@Injectable()
export class ConsonantService {
  

  getConsonants(): Promise<Consonant[]> {
    return Promise.resolve(CONSONANTS);
  }

  getConsonant(id: number): Promise<Consonant> {
    return this.getConsonants()
               .then(consonants => consonants.find(consonant => consonant.id === id));
  }
}
