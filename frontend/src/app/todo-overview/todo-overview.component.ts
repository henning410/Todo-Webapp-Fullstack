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

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadTodo();
  }

  loadTodo() {
    this.dataService.getTodo()
      .subscribe((data: Todo[]) => this.todos = data);

    /*this.dataService.getTodo()
      .subscribe((data: Todo) => this.todo = {
        todo: data.todo,
        priority:  data.priority,
      });*/
  }

}
