import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  // Create a new todo
  async createTodo(title: string, ownerId: number): Promise<Todo> {
    const todo = this.todoRepository.create({ title, owner: { id: ownerId } as any });
    return this.todoRepository.save(todo);
  }

  //
  findAll(ownerId: number) {
    return this.todoRepository.find({ where: { owner: { id: ownerId } } });
  }
  // Get all todos
  async getTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }
  // Delete a todo
  async deleteTodo(id: number, ownerId: number): Promise<void> {
    await this.todoRepository.delete({ id, owner: { id: ownerId } as any });
    
  }
}
