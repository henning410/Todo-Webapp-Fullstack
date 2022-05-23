import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from "../models/todo";
import {DataService} from "../service/data.service";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo | undefined;
  @Input() preview: boolean = false;
  @Output() deleteTodoEvent = new EventEmitter<string>();
  isVisible = false;
  confirmModal?: NzModalRef; // For testing by now
  error = "";

  constructor(private todoService: DataService, private modal: NzModalService) {
  }

  ngOnInit(): void {
  }

  showConfirm() {
    if (!this.preview) {
      this.confirmModal = this.modal.confirm({
        nzTitle: 'Do you want to delete these Todo?',
        nzContent: 'The Todo with the title \"' + this.todo?.todo + '\" is gonna be deleted.',
        nzOnOk: () => {
          if (this.todo) {
            this.todoService.deleteTodo(this.todo)
              .subscribe(resp => {
                  this.deleteTodoEvent.emit();
                },
                error => {
                  this.error = 'Ups, some error occurred';
                });
          }
        }
      });
    }
  }

  showModal(): void {
    if (!this.preview) {
      this.isVisible = true;
    }
  }

  handleOk(): void {
    this.isVisible = false;
    if (this.todo) {
      this.todoService.updateTodo(this.todo)
        .subscribe(resp => {
            console.log('resp');
          },
          error => {
            this.error = 'Ups, some error occurred';
          });
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  toNumber() {
    console.log('old: ', this.todo);
    this.todo!.priority = +this.todo!.priority;
    console.log('new: ', this.todo);
    return this.todo!.priority;
  }
}
