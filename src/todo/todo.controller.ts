import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('todo')
@UseGuards(AuthGuard)
export class TodoController {
constructor(private readonly todoService: TodoService) {}

@Post()
create(@Body() todo: Todo, @Req() req: any): Promise<Todo> {
    return this.todoService.createTodo(todo.title, req.user.id);
  }
 
@Get()
findAll(@Req() req: any) {
    return this.todoService.findAll(req.user.id);
}
 
@Delete(':id')
remove(@Param('id') id: number, @Req() req: any): Promise<void> {
    return this.todoService.deleteTodo(id,req.user.id);
  }
}
