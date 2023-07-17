import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateDeviceDto {
	@ApiProperty({ example: 'iPhone', description: 'Название дивайса' })
	@IsString({ message: 'Должно быть строкой' })
	readonly name: string

	@ApiProperty({ example: '1000', description: 'Цена дивайса' })
	@IsNumber({}, { message: 'Должно быть числом' })
	readonly price: number

	@ApiProperty({ example: '1', description: 'ID бренда' })
	@IsNumber({}, { message: 'Должно быть числом' })
	readonly brandId: number

	@ApiProperty({ example: '1', description: 'ID типа' })
	@IsNumber({}, { message: 'Должно быть числом' })
	readonly typeId: number

	@ApiProperty({ example: 'iPhone', description: 'Информация о девайсе' })
	@IsString({ message: 'Должно быть строкой' })
	readonly info: string
}
