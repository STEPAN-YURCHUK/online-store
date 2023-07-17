import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateBrandDto {
	@ApiProperty({ example: 'Apple', description: 'Название бренда' })
	@IsString({ message: 'Должно быть строкой' })
	readonly name: string
}
