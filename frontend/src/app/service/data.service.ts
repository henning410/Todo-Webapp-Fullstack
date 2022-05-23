import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Todo} from "../models/todo";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient, private router: Router) { }

  getTodo(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:3000/todo')
      .pipe(catchError(this.handleError));
  }

  deleteTodo(todo: Todo): Observable<any> {
    return this.http.delete<Todo[]>('http://localhost:3000/todo/' + todo.todo)
      .pipe(catchError(this.handleError));
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>('http://localhost:3000/todo/', todo)
      .pipe(catchError(this.handleError));
    this.router.navigate(['my-todos']);
  }

  updateTodo(todo: Todo) {
    //TODO: correct http call here
    console.log('Update this todo: ', todo);
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
