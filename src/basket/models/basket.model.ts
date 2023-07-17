import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript'
import { User } from '../../user/models/create.user.model'
import { BasketDevice } from './basket.device.model'

@Table({ tableName: 'basket' })
export class Basket extends Model<Basket> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ForeignKey(() => User)
	@Column
	userId: number

	@BelongsTo(() => User)
	user: User

	@HasMany(() => BasketDevice)
	basketDevices: BasketDevice[]
}
