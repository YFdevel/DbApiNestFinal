import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import {PostEntity} from "./post.entity";
import {UserEntity} from "./user.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity('comments')
export class CommentEntity {
    @ApiProperty({example:'1',description:'Уникальный идентификатор'})
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @ApiProperty({example:'Содержание',description:'Текст комментария'})
    @Column({name: 'text', type: 'text'})
    text: string;

    @ApiProperty({example:'2022-04-24 10:36:29.292742',description:'Дата создания пользователя'})
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @ApiProperty({example:'2022-04-24 10:36:29.292742',description:'Дата обновления пользователя'})
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ApiProperty({description:'Связь с таблицей пользователей многие-к-одному'})
    @ManyToOne(() => UserEntity, (user) => user.comments)
    @JoinColumn()
    user: UserEntity;

    @ApiProperty({description:'Связь с таблицей постов многие-к-одному'})
    @ManyToOne(() => PostEntity, (post) => post.comments)
    @JoinColumn()
    post: PostEntity;

}
