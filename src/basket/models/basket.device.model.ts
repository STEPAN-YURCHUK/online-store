import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { Basket } from './basket.model'
import { Device } from '../../device/models/device.model'

@Table({ tableName: 'basket_device' })
export class BasketDevice extends Model<BasketDevice> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ForeignKey(() => Basket)
	@Column
	basketId: number

	@BelongsTo(() => Basket)
	basket: Basket

	@ForeignKey(() => Device)
	@Column
	deviceId: number

	@BelongsTo(() => Device)
	device: Device
}
