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

  post(url:any, data:any, download: any = false) {
    if(download) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json', // Định dạng dữ liệu gửi đi
        'Accept': 'application/octet-stream', // Định dạng dữ liệu được chấp nhận từ phản hồi
      });
      return this.http.post(API_BASE_URL + url, data, {
        headers: headers,
        responseType: 'arraybuffer'  // Thay đổi responseType thành 'arraybuffer'
      });
    }
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
