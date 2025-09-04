import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import { User } from '../user/user.entity';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;


    @Column({default: false})
    done: boolean;

    @ManyToOne(() => User, {eager: true})
    owner: User
}