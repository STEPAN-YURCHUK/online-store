import { ApiProperty } from '@nestjs/swagger'
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript'
import { BasketDevice } from '../../basket/models/basket.device.model'
import { Brand } from '../../brand/models/brand.model'
import { Type } from '../../type/models/type.model'
import { Rating } from '../../user/models/rating.model'
import { DeviceInfo } from './device.info.model'

@Table({ tableName: 'device' })
export class Device extends Model<Device> {
	@ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 'iPhone', description: 'Название устройства' })
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	name: string

	@ApiProperty({ example: '1000', description: 'Цена устройства' })
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	price: number

	@ApiProperty({ example: '3', description: 'Рейтинг устройства' })
	@Column({
		type: DataType.INTEGER,
		defaultValue: 0,
	})
	rating: number

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	img: string

	@ForeignKey(() => Type)
	@Column
	typeId: number

	@BelongsTo(() => Type)
	type: Type

	@ForeignKey(() => Brand)
	@Column
	brandId: number

	@BelongsTo(() => Brand)
	brand: Brand

	@HasMany(() => Rating)
	ratings: Rating[]

	@HasMany(() => BasketDevice)
	baskerDevices: BasketDevice[]

	@HasMany(() => DeviceInfo)
	devicesInfo: DeviceInfo[]
}
