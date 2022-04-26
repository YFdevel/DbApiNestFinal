import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
    OneToMany, JoinColumn
} from 'typeorm';
import {CommentEntity} from './comment.entity';
import {UserEntity} from "./user.entity";
import {ApiProperty} from "@nestjs/swagger";


@Entity('posts')
export class PostEntity {
    @ApiProperty({example:'1',description:'Уникальный идентификатор'})
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @ApiProperty({example:'Пост №1',description:'Название поста'})
    @Column({name: 'title', type: 'text'})
    title: string;

    @ApiProperty({example:'Содержание',description:'Содержание поста'})
    @Column({name: 'description', type: 'text'})
    description: string;

    @ApiProperty({example:'2022-04-24 10:36:29.292742',description:'Дата создания пользователя'})
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @ApiProperty({example:'2022-04-24 10:36:29.292742',description:'Дата обновления пользователя'})
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ApiProperty({description:'Связь с таблицей пользователей многие-к-одному'})
    @ManyToOne(() => UserEntity, (user) => user.posts)
    @JoinColumn()
    user: UserEntity;

    @ApiProperty({description:'Связь с таблицей комментариев один-ко-многим'})
    @OneToMany(() => CommentEntity, (comment) => comment.post,{ cascade: true })
    comments: CommentEntity[];
}
