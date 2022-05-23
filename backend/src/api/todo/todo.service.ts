import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Todo} from "../entities/todo.entity";
import {Repository, UpdateResult} from "typeorm";

@Injectable()
export class TodoService {

    constructor(@InjectRepository(Todo) private repository: Repository<Todo>) {
    }


    public getAllTodos() {
        return this.repository.find();
    }

    public async getTodoByName(name: string) {
        return this.repository.findOne(name);
    }

    public changeTodo(todo: any) {
        return this.repository.createQueryBuilder()
            .update(Todo)
            .set({priority: todo.priority})
            .where("todo = :todo", {todo: todo.todo})
            .execute();
    }

    public delete(name: string) {
        return this.repository.createQueryBuilder()
            .delete()
            .from(Todo)
            .where("todo = :todo", {todo: name})
            .execute();
    }

    public add(todo: any) {
        return this.repository.createQueryBuilder()
            .insert()
            .into(Todo)
            .values([
                { todo: todo.todo, priority: todo.priority},
            ])
            .execute();
    }
}
