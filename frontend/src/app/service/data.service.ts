import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Todo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  configUrl = 'assets/mockData.json'

  constructor(private http: HttpClient) { }

  getTodo() {
    return this.http.get<Todo[]>(this.configUrl);
  }
}
