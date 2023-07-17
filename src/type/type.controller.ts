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
import { CreateTypeDto } from './dto/create.type.dto'
import { Type } from './models/type.model'
import { TypeService } from './type.service'

@ApiTags('Тип устройства')
@Controller('type')
export class TypeController {
	constructor(private typeService: TypeService) {}

	@Post()
	@ApiOperation({ summary: 'Создание типа' })
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	create(@Body() dtoType: CreateTypeDto) {
		return this.typeService.createType(dtoType)
	}

	@Get()
	@ApiOperation({ summary: 'Получение всех типов' })
	@ApiResponse({ status: 200, type: [Type] })
	async getAll() {
		return this.typeService.getAllTypes()
	}

	@Delete(':id')
	@Delete(':id')
	@ApiOperation({ summary: 'Удаление типа' })
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	delete(
		@Param('id')
		id: number,
	) {
		return this.typeService.deleteType(id)
	}
}
