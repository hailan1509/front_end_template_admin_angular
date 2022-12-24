import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  post2(url: string, body: any, withToken: boolean = true) {
    let header: any = {}
    header['Content-Type'] = 'application/json';

    if (withToken) {
      let access_token = ''
      header['Authorization'] = `Bearer ${access_token}`;
    }

    let options: any = {
      headers: new HttpHeaders(header),
    }

    return this.http
      .post<any>(API_BASE_URL + url, body, options)
  }

}
