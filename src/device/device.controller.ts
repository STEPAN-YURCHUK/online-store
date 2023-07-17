import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RolesGuard } from 'src/auth/role.guard'
import { Roles } from 'src/auth/roles-auth.decoratot'
import { DeviceService } from './device.service'
import { CreateDeviceDto } from './dto/create.device.dto'
import { Device } from './models/device.model'

@ApiTags('Устройства')
@Controller('device')
export class DeviceController {
	constructor(private deviceService: DeviceService) {}

	@Post()
	@ApiOperation({ summary: 'Создание устройства' })
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@UseInterceptors(FileInterceptor('img'))
	create(@Body() dto: CreateDeviceDto, @UploadedFile() img) {
		try {
			const device = this.deviceService.create(dto, img)
			return device
		} catch (e) {
			console.log(e)
		}
	}

	@Get()
	@ApiOperation({ summary: 'Получение всех устройств' })
	@ApiResponse({ status: 200, type: [Device] })
	getAll(
		@Query('brandId') brandId: string,
		@Query('typeId') typeId: string,
		@Query('limit') limit: number,
		@Query('page') page: number,
	) {
		return this.deviceService.getAll(brandId, typeId, limit, page)
	}

	@Get(':id')
	@ApiOperation({ summary: 'Получение одного устройства' })
	@ApiResponse({ status: 200, type: [Device] })
	getOne(@Param('id') id: number) {
		return this.deviceService.getOne(id)
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Удаление устройства' })
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	delete(
		@Param('id')
		id: number,
	) {
		return this.deviceService.deleteDevice(id)
	}
}
