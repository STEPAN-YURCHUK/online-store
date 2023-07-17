import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { addDeviceInBasketDto } from './dto/add.device.in.basket.dto'
import { BasketDevice } from './models/basket.device.model'
import { Basket } from './models/basket.model'

@Injectable()
export class BasketService {
	constructor(
		@InjectModel(Basket) private basketRepository: typeof Basket,
		@InjectModel(BasketDevice)
		private basketDeviceRepository: typeof BasketDevice,
	) {}
	async createBasket(userId) {
		const basket = await this.basketRepository.create({ userId })
		return basket
	}

	async getAllBasket() {
		const basket = await this.basketRepository.findAll()
		return basket
	}

	async addDeviceInBasket(dto: addDeviceInBasketDto) {
		const addDevice = await this.basketDeviceRepository.create(dto)
		console.log(addDevice)
		return addDevice
	}

	async getAllBasketUserID() {
		const getAll = await this.basketDeviceRepository.findAll()
		return getAll
	}
	// async deleteOneDeviceInBasket() {}

	// async deleteAllDeviceInBasket() {}

	// async getAllBasketUserID() {}
}
