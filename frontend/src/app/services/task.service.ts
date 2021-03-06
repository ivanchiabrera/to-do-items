import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'any'
})
export class TaskService {
 
  constructor(public http: HttpClient) { }

  url = environment.apiUrl;
  token = localStorage.getItem("token");
  headers = {
    headers: new HttpHeaders({
      token: this.token
    }),
  };
  
  // ======================================================
  new(idFolder, description,done) {
    return this.http.post(`${this.url}task/new`, {
      description: description,
      done: done,
      folder_id: idFolder,
    },
      this.headers
    ).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // ======================================================
  update(idTask, description,done) {
    return this.http
      .put(`${this.url}task/update/${idTask}`,
        {
          description: description,
          done: done,
        },
        this.headers
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // ======================================================
  all(idFolder) {
    return this.http.get(`${this.url}task/all/${idFolder}`,
      this.headers
    ).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // ======================================================
  delete(idTask) {
    return this.http
      .delete(`${this.url}task/delete/${idTask}`,
        this.headers
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
}
