import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiURL = 'https://jsonplaceholder.typicode.com';
  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getAll(): Observable<Post[]> {
    return this.httpClient
      .get<Post[]>(this.apiURL + '/posts/')
      .pipe(catchError(this.errorHandler));
  }

  create(post: Post): Observable<Post> {
    return this.httpClient
      .post<Post>(
        this.apiURL + '/posts/',
        JSON.stringify(post),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<Post> {
    return this.httpClient
      .get<Post>(this.apiURL + '/posts/' + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, post: Post): Observable<Post> {
    return this.httpClient
      .patch<Post>(
        this.apiURL + '/posts/' + id,
        JSON.stringify(post),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  delete(id: number): Observable<Post> {
    return this.httpClient
      .delete<Post>(this.apiURL + '/posts/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
}
