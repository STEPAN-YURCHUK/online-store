import { ApiProperty } from '@nestjs/swagger'
import {
	BelongsToMany,
	Column,
	DataType,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript'
import { Device } from '../../device/models/device.model'
import { TypeBrand } from '../../type/models/type.brand.model'
import { Type } from '../../type/models/type.model'

@Table({ tableName: 'brand' })
export class Brand extends Model<Brand> {
	@ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 'Apple', description: 'Название бренда' })
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	name: string

	@HasMany(() => Device)
	devices: Device[]

	@BelongsToMany(() => Type, () => TypeBrand)
	types: Type[]
}
