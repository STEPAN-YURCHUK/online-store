import { Injectable } from '@nestjs/common'
import { CreateTypeDto } from './dto/create.type.dto'
import { InjectModel } from '@nestjs/sequelize'
import { Type } from './models/type.model'

@Injectable()
export class TypeService {
	constructor(@InjectModel(Type) private typeRepository: typeof Type) {}

	async createType(dto: CreateTypeDto) {
		const type = await this.typeRepository.create(dto)
		return type
	}

	async getAllTypes() {
		const types = await this.typeRepository.findAll()
		return types
	}

	async deleteType(id: number) {
		const deleteType = await this.typeRepository.destroy({ where: { id: id } })
		return deleteType
	}
}
