import { Injectable } from '@angular/core';
import { UserTokenState } from '../models/response/user-token-state.model';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getToken(): UserTokenState {
    return JSON.parse(localStorage.getItem('jwtToken'));
  }

  saveToken(userToken: UserTokenState) {
    localStorage.setItem('jwtToken', JSON.stringify(userToken));
  }

  destroyToken() {
    localStorage.removeItem('jwtToken');
  }
  
}
