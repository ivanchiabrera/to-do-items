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
  new(idUser, task) {
    return this.http.post(`${this.url}task/new`, {
      description: task.description,
      done: task.done,
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
  update(idTask, task) {
    return this.http
      .put(`${this.url}task/update/${idTask}`,
        {
          description: task.description,
          done: task.done,
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
  all(idUser) {
    return this.http.get(`${this.url}task/all/${idUser}`,
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
