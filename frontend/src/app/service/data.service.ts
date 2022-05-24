import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Todo} from "../models/todo";

const url= 'https://henning-weise-todo.herokuapp.com/todo/'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getTodo(): Observable<Todo[]> {
    return this.http.get<Todo[]>(url)
      .pipe(catchError(this.handleError));
  }

  deleteTodo(todo: Todo): Observable<any> {
    return this.http.delete<Todo[]>(url + todo.todo)
      .pipe(catchError(this.handleError));
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(url, todo)
      .pipe(catchError(this.handleError));
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(url, todo)
      .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
