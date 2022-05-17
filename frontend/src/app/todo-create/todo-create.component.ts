import { Component, OnInit } from '@angular/core';
import {Todo} from "../models/todo";

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent implements OnInit {
  current = 0;
  index = 'First-content';
  todo: Todo = {
    todo: '',
    priority: 1,
  };

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  done(): void {
    console.log('done:', this.todo);
  }

  constructor() { }

  ngOnInit(): void {
  }

  toNumber() {
    console.log('old: ', this.todo);
    this.todo.priority = +this.todo.priority;
    console.log('new: ', this.todo);
  }
}
