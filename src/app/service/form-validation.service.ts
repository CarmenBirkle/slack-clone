import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  testInputLength(inputString: string, rqdLength: number) {
    if(inputString.length >= rqdLength) {
      return true;
    } else {
      return false;
    }
  }

  testExist(inputString: string) {
    return false; // not exist
  }

}
