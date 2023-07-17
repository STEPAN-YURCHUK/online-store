import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Brand } from '../../brand/models/brand.model'
import { Type } from './type.model'

@Table({ tableName: 'type_brand' })
export class TypeBrand extends Model<TypeBrand> {
	@ForeignKey(() => Brand)
	@Column
	brandId: number

	@ForeignKey(() => Type)
	@Column
	typeId: number
}
