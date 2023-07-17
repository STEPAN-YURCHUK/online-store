import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Device } from './models/device.model'
import { CreateDeviceDto } from './dto/create.device.dto'
import { FilesService } from '../files/files.service'
import { DeviceInfo } from './models/device.info.model'

@Injectable()
export class DeviceService {
	constructor(
		@InjectModel(Device) private deviceRepository: typeof Device,
		private fileService: FilesService,
	) {}

	async create(dto: CreateDeviceDto, img) {
		try {
			const fileName = await this.fileService.createFile(img)
			const device = await this.deviceRepository.create({
				...dto,
				img: fileName,
			})
			return device
		} catch (e) {
			console.log(e)
		}
	}

	async getAll(brandId, typeId, limit, page) {
		page = page || 1
		limit = limit || 9
		let offset = page * limit - limit
		let device
		if (!brandId && !typeId) {
			device = await this.deviceRepository.findAndCountAll({ limit, offset })
		}
		if (brandId && !typeId) {
			device = await this.deviceRepository.findAndCountAll({
				where: { brandId },
				limit,
				offset,
			})
		}
		if (!brandId && typeId) {
			device = await this.deviceRepository.findAndCountAll({
				where: { typeId },
				limit,
				offset,
			})
		}
		if (brandId && typeId) {
			device = await this.deviceRepository.findAndCountAll({
				where: { brandId, typeId },
				limit,
				offset,
			})
		}
		return device
	}

	async getOne(id) {
		const device = await this.deviceRepository.findOne({
			where: { id },
			include: [{ model: DeviceInfo, as: 'devicesInfo' }],
		})
		return device
	}

	async deleteDevice(id: number) {
		const deleteDevice = await this.deviceRepository.destroy({
			where: { id: id },
		})
		return deleteDevice
	}
}
