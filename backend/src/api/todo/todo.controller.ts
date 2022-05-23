import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query} from '@nestjs/common';
import {TodoService} from "./todo.service";
import {Todo} from "../entities/todo.entity";
import {UpdateResult} from "typeorm";

@Controller('todo')
export class TodoController {
    @Inject(TodoService)
    private readonly service: TodoService;

    @Get()
    public getAllTodos(): Promise<Todo[]> {
        return this.service.getAllTodos();
    }

    @Get()
    public getTodosByName(@Param('name') name: string) {
        return this.service.getTodoByName(name);
    }

    @Put()
    public changeState(@Body() todo: any): Promise<UpdateResult> {
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
