import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from '../service/todo.service';
import { UpdateResult } from 'typeorm';
import { TodoI } from '../models/todo.interface';

@Controller('todo')
export class TodoController {
  @Inject(TodoService)
  private readonly service: TodoService;

  @Get()
  public getAllTodos(): Promise<TodoI[]> {
    return this.service.getAllTodos();
  }

  @Get()
  public getTodoByName(@Param('name') name: string): Promise<TodoI> {
    return this.service.getTodoByName(name);
  }

  @Put()
  public changeTodo(@Body() todo: any): Promise<UpdateResult> {
    console.log('Change: ', todo);
    return this.service.changeTodo(todo);
  }

  @Post()
  public addTodo(@Body() todo: any) {
    return this.service.add(todo);
  }

  @Delete(':name')
  public delete(@Param() params) {
    console.log('DELETE on backend: ', params.name);
    return this.service.delete(params.name);
  }
}
