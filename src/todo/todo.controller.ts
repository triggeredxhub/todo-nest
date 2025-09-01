import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

@Controller('todo')
export class TodoController {
constructor(private readonly todoService: TodoService) {}

@Post()
create(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.createTodo(todo.title);
  }
 
@Get()
findAll(): Promise<Todo[]> {
    return this.todoService.getTodos();
  }
 
@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
    return this.todoService.deleteTodo(id);
  }
}
