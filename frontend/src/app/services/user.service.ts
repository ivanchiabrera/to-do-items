import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'any'
})
export class UserService {  

  constructor(public http: HttpClient) { }

  url = environment.apiUrl;
  jwtHelper = new JwtHelperService();

  // ======================================================
  register(user) {
    return this.http.post(`${this.url}user/register`, {
      name: user.name,
      password: user.password,
    }
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
    }
    ).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
  // ======================================================

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }

  // ======================================================
  unLogin() {
    localStorage.removeItem('token');
    location.reload();
  }
}
