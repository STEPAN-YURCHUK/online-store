import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateTypeDto {
	@ApiProperty({ example: 'Телефоны', description: 'Название типа' })
	@IsString({ message: 'Должно быть строкой' })
	readonly name: string
}
