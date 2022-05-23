import { Component, OnInit } from '@angular/core';
import {Todo} from "../models/todo";
import {DataService} from "../service/data.service";
import {Router} from "@angular/router";

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
  error = "";

  constructor(private todoService: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  done(): void {
    this.todoService.createTodo(this.todo).subscribe(todo => {
      this.router.navigate(['my-todos'])
    },
      error => {
       this.error = error;
      });
  }
}
