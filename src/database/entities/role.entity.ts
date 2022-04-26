import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Index,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable
} from 'typeorm';
import {UserEntity} from "./user.entity";
import {UsersRolesEntity} from "./users_roles.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity('roles')
export class RoleEntity {
    @ApiProperty({example:'1',description:'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:'user',description:'Значение роли'})
    @Index()
    @Column({ name: 'value', type: 'text',unique: true })
    value: string;

    @ApiProperty({example:'Пользователь',description:'Описание роли'})
    @Column({ name: 'description', type: 'text'})
    description: string;

    @ApiProperty({example:'2022-04-24 10:36:29.292742',description:'Дата создания пользователя'})
    @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
    createdAt: Date;

    @ApiProperty({example:'2022-04-24 10:36:29.292742',description:'Дата обновления пользователя'})
    @UpdateDateColumn({ type: 'timestamp', name: 'updatedAt' })
    updatedAt: Date;

    @ApiProperty({description:'Связь с таблицей пользователей многие-ко-многим'})
    @ManyToMany(() => UserEntity,()=>UsersRolesEntity)
    @JoinTable()
    users: UserEntity[];
}
