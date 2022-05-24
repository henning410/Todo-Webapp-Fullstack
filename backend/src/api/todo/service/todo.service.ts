import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../models/todo.entity';
import { Repository } from 'typeorm';
import { TodoI } from '../models/todo.interface';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private repository: Repository<Todo>) {}

  public getAllTodos(): Promise<TodoI[]> {
    return this.repository.find({ order: { priority: 'ASC' } });
  }

  public async getTodoByName(name: string): Promise<Todo> {
    return this.repository.findOne(name);
  }

  public changeTodo(todo: TodoI) {
    return this.repository
      .createQueryBuilder()
      .update(Todo)
      .set({ priority: todo.priority })
      .where('todo = :todo', { todo: todo.todo })
      .execute();
  }

  public delete(name: string) {
    return this.repository
      .createQueryBuilder()
      .delete()
      .from(Todo)
      .where('todo = :todo', { todo: name })
      .execute();
  }

  public add(todo: TodoI) {
    return this.repository
      .createQueryBuilder()
      .insert()
      .into(Todo)
      .values([{ todo: todo.todo, priority: todo.priority }])
      .execute();
  }
}
