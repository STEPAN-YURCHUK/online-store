import { ApiProperty } from '@nestjs/swagger'
import {
	BelongsToMany,
	Column,
	DataType,
	HasMany,
	HasOne,
	Model,
	Table,
} from 'sequelize-typescript'
import { Role } from 'src/roles/models/roles.model'
import { UserRoles } from 'src/roles/models/user.roles.model'
import { Basket } from '../../basket/models/basket.model'
import { Rating } from './rating.model'

interface UserCreationAttrs {
	email: string
	password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
	@ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 'user@gmail.com', description: 'Почтовый адрес' })
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	email: string

	@ApiProperty({ example: '12345678', description: 'Пароль' })
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	password: string

	@ApiProperty({ example: 'true', description: 'Подтверждение аккаунта' })
	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false,
	})
	isActivate: boolean

	@ApiProperty({ example: 'true', description: 'Забанен или нет' })
	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false,
	})
	banned: boolean

	@ApiProperty({ example: 'За неоплату товара', description: 'Причина бана' })
	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	banReason: string

	@HasOne(() => Basket)
	basket: Basket

	@HasMany(() => Rating)
	reting: Rating

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[]
}
