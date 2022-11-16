import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { 

  }
  //base api url
  baseUrl = environment.baseUrl;

  postEmployeeInfo(data: any) {
    return this.http.post<any>(this.baseUrl, data)
    .pipe(map((res: any)=>{
      return res;
    }));
  }

  getEmployeeInfo() {
    return this.http.get<any>(this.baseUrl)
    .pipe(map((res: any)=>{
      return res;
    }));
  }

  updateEmployeeInfo(data: any, id: number) {
    return this.http.put<any>(this.baseUrl+id, data)
    .pipe(map((res: any)=>{
      return res;
    }));
  }

  deleteEmployeeInfo(id: number) {
    return this.http.delete<any>(this.baseUrl+id)
    .pipe(map((res: any)=>{
      return res;
    }));
  }
}
