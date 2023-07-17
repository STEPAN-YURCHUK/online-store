import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RolesGuard } from 'src/auth/role.guard'
import { Roles } from 'src/auth/roles-auth.decoratot'
import { BrandService } from './brand.service'
import { CreateBrandDto } from './dto/create.brand.dto'
import { Brand } from './models/brand.model'

@ApiTags('Бренд')
@Controller('brand')
export class BrandController {
	constructor(private brandService: BrandService) {}

	@Post()
	@ApiOperation({ summary: 'Создание бренда' })
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	create(@Body() dtoBrand: CreateBrandDto) {
		return this.brandService.createBrand(dtoBrand)
	}

	@Get()
	@ApiOperation({ summary: 'Получение всех брендов' })
	@ApiResponse({ status: 200, type: [Brand] })
	async getAll() {
		return this.brandService.getAllBrands()
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Удаление бренда' })
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	delete(
		@Param('id')
		id: number,
	) {
		return this.brandService.deleteBrand(id)
	}
}
