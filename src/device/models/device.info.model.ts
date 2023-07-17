import { ApiProperty } from '@nestjs/swagger'
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { Device } from './device.model'

@Table({ tableName: 'device_info' })
export class DeviceInfo extends Model<DeviceInfo> {
	@ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 'text', description: 'Заголовок' })
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	title: string

	@ApiProperty({ example: 'text', description: 'Описание' })
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	description: string

	@ForeignKey(() => Device)
	@Column
	deviceId: number

	@BelongsTo(() => Device)
	device: Device
}
