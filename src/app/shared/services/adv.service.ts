import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Adv } from '../models/adv';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvService {
  apiURL: string = environment.baseRoute+'Api/Adv/';

  constructor(public httpClient: HttpClient) { }
  getAdvs(): Observable<Adv[]> {
    return this.httpClient.get<Adv[]>(this.apiURL + 'getAdvs');
  }
}
