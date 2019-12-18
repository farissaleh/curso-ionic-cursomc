import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BucketService {

  constructor(public http: HttpClient) {
  }
  bucketUrl : string = API_CONFIG.bucketBaseUrl;

  findImage(path : string): Observable<any> {
    let url = this.bucketUrl+path;
    return this.http.get(url,{responseType : 'blob'});
  }

  // let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
  //   return this.http.get(url, {responseType : 'blob'})
}
