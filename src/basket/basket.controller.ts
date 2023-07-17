import { Body, Controller, Get, Post } from '@nestjs/common'
import { BasketService } from './basket.service'
import { addDeviceInBasketDto } from './dto/add.device.in.basket.dto'

@Controller('basket')
export class BasketController {
	constructor(private basketService: BasketService) {}

	@Get()
	getAll() {
		const allBasket = this.basketService.getAllBasket()
		return allBasket
	}

	@Get('getUserBasket')
	getAllBasketUserID() {
		const getBasket = this.basketService.getAllBasketUserID()
		return getBasket
	}

	@Post()
	addDeviceInBasket(@Body() dto: addDeviceInBasketDto) {
		const addDevice = this.basketService.addDeviceInBasket(dto)
		return addDevice
	}
}
