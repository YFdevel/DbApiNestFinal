import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany, Index, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable,
} from 'typeorm';
import {PostEntity} from "./post.entity";
import {CommentEntity} from "./comment.entity";
import {IsEmail} from "class-validator";
import {SessionEntity} from "./session.entity";
import {RoleEntity} from "./role.entity";
import {UsersRolesEntity} from "./users_roles.entity";
import {ApiProperty} from "@nestjs/swagger";


@Entity('users')
export class UserEntity {
    @ApiProperty({example:'1',description:'Уникальный идентификатор'})
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @ApiProperty({example:'Иван',description:'Имя пользователя'})
    @Index()
    @Column({name: 'firstName', type: 'text'})
    firstName: string;

    @ApiProperty({example:'Иванов',description:'Фамилия пользователя'})
    @Index()
    @Column({name: 'lastName', type: 'text'})
    lastName: string;

    @ApiProperty({example:'xxxx.jpeg',description:'Аватарка пользователя'})
    @Column({name: 'avatar', type: 'text'})
    avatar: string;

    @ApiProperty({example:'example@mail.ru',description:'Email пользователя'})
    @Column({name: 'email', type: 'text',unique:true})
    @IsEmail()
    email: string;

    @ApiProperty({example:'хххххххххх',description:'Пароль пользователя'})
    @Column({name: 'password', type: 'text'})
    password: string;

    @ApiProperty({description:'Связь с таблицей постов один-ко-многим'})
    @OneToMany(() => PostEntity, (post) => post.user,{ cascade: true })
    posts: PostEntity[];

    @ApiProperty({description:'Связь с таблицей комментариев один-ко-многим'})
    @OneToMany(() => CommentEntity, (comment) => comment.user,{ cascade: true })
    comments: CommentEntity[];

    @ApiProperty({description:'Связь с таблицей сессий один-ко-многим'})
    @OneToMany(() => SessionEntity, session => session.user, { cascade: true })
    sessions: SessionEntity[];

    @ApiProperty({description:'Связь с таблицей ролей многие-ко-многим'})
    @ManyToMany(() => RoleEntity,()=>UsersRolesEntity)
    @JoinTable()
    roles: RoleEntity[];

    @ApiProperty({example:'2022-04-24 10:36:29.292742',description:'Дата создания пользователя'})
    @CreateDateColumn({type: 'timestamp', name: 'createdAt'})
    createdAt: Date;

    @ApiProperty({example:'2022-04-24 10:36:29.292742',description:'Дата обновления пользователя'})
    @UpdateDateColumn({type: 'timestamp', name: 'updatedAt'})
    updatedAt: Date;

}
