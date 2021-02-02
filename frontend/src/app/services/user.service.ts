import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url = environment.apiUrl;
  token = localStorage.getItem("token");
  headers = {
    headers: new HttpHeaders({
      token: this.token
    }),
  };

  constructor(public http: HttpClient) { }

  // ======================================================
  register(user) {
    return this.http.post(`${this.url}user/register`, {
      name: user.name,
      password: user.password,
    },
      this.headers
    ).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // ======================================================
  login(user) {
    return this.http.post(`${this.url}user/login`, {
      name: user.name,
      password: user.password,
    },
      this.headers
    ).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
