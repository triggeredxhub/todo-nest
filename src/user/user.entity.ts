import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Todo } from "../todo/todo.entity";

@Entity()
@Unique(['username'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    passwordHash: string;

    @OneToMany(() => Todo, (Todo) => Todo.owner)
    todos: Todo[]


}