import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'any'
})
export class FolderService {

  constructor(public http: HttpClient) { }

  url = environment.apiUrl;
  token = localStorage.getItem("token");
  headers = {
    headers: new HttpHeaders({
      token: this.token
    }),
  };
  
  // ======================================================
  new(idUser, description,) {
    return this.http.post(`${this.url}folder/new`, {
      description: description,
      user_id: idUser,
    },
      this.headers
    ).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // ======================================================
  all(idUser) {
    return this.http.get(`${this.url}folder/all/${idUser}`,
      this.headers
    ).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // ======================================================
  delete(idFolder) {
    return this.http
      .delete(`${this.url}folder/delete/${idFolder}`,
        this.headers
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
}
