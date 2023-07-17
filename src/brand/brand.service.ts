import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Brand } from './models/brand.model'
import { CreateBrandDto } from './dto/create.brand.dto'

@Injectable()
export class BrandService {
	constructor(@InjectModel(Brand) private brandRepository: typeof Brand) {}

	async createBrand(dto: CreateBrandDto) {
		const brand = await this.brandRepository.create(dto)
		return brand
	}

	async getAllBrands() {
		const brands = await this.brandRepository.findAll()
		return brands
	}

	async deleteBrand(id: number) {
		const deleteBrand = await this.brandRepository.destroy({
			where: { id: id },
		})
		return deleteBrand
	}
}
