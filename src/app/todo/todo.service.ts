import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiURL = 'http://localhost:3000/languages';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiURL);
  }

  findTodo(id: number): Observable<Todo> {
    return this.http.get<Todo>(this.apiURL);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(
      this.apiURL,
      JSON.stringify(todo),
      this.httpOptions
    );
  }
  updateTodo(id: number, todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(
      this.apiURL + '/' + id,
      JSON.stringify(todo),
      this.httpOptions
    );
  }
  deleteTodo(id: number): Observable<Todo> {
    return this.http.delete<Todo>(this.apiURL + '/' + id, this.httpOptions);
  }
}
