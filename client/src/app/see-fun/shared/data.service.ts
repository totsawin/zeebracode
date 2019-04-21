import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = '/api';
  // url = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  fetchCode(code: string): Observable<any> {
    return this.http.get<any>(`${this.url}/codes/${code}`);
  }

  /*submitIndex(index) {
    return this.http.post(this.url, {index: index});
  }*/
}
