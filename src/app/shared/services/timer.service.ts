import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  apiURL: string = environment.baseRoute+'api/timer/';

  constructor(public httpClient: HttpClient) { }
timerSmartAgent(){
  return this.httpClient.get(this.apiURL+'SetTimer');
}

}
