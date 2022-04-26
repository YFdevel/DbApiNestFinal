import {Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn, JoinColumn, ManyToOne} from 'typeorm';
import {UserEntity} from './user.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity('sessions')
export class SessionEntity {
    @ApiProperty({example:'1',description:'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:'Bearer ryuwyeriuybxvcvb',description:'Уникальный токен'})
    @Index()
    @Column({unique: true})
    token: string;

    @ApiProperty({example:'2022-04-24 10:36:29.292742',description:'Дата создания пользователя'})
    @CreateDateColumn({type: 'timestamp', name: 'createdAt'})
    createdAt: Date;

    @ApiProperty({description:'Связь с таблицей пользователей многие-к-одному'})
    @ManyToOne(() => UserEntity, (user) => user.sessions)
    @JoinColumn()
    user: UserEntity;
}
