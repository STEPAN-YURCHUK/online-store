import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { User } from './create.user.model'
import { Device } from '../../device/models/device.model'

@Table({ tableName: 'rating' })
export class Rating extends Model<Rating> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	rate: string

	@ForeignKey(() => User)
	@Column
	userId: number

	@BelongsTo(() => User)
	user: User

	@ForeignKey(() => Device)
	@Column
	deviceId: number

	@BelongsTo(() => Device)
	device: Device
}
