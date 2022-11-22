import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../config/config'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(url:any) {
    return this.http.get(API_BASE_URL + url);
  }

  post(url:any, data:any) {
    return this.http.post(API_BASE_URL + url, data);
  }

}
