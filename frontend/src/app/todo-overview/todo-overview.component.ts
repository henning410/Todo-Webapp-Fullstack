import { Component, OnInit } from '@angular/core';
import {Todo} from "../models/todo";
import {DataService} from "../service/data.service";

@Component({
  selector: 'app-todo-overview',
  templateUrl: './todo-overview.component.html',
  styleUrls: ['./todo-overview.component.scss']
})
export class TodoOverviewComponent implements OnInit {
  todos: Todo[] = [];
  headers: any;
  error = "";

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.dataService.getTodo()
      .subscribe((data: Todo[]) => {
        this.todos = [];
        this.todos = data;
      },
        error => {
        this.error = error;
        });
  }

}
