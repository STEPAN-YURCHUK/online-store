import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Brand } from 'src/brand/models/brand.model'
import { DeviceInfo } from 'src/device/models/device.info.model'
import { Device } from 'src/device/models/device.model'
import { Role } from 'src/roles/models/roles.model'
import { TypeBrand } from 'src/type/models/type.brand.model'
import { Type } from 'src/type/models/type.model'
import { User } from 'src/user/models/create.user.model'
import { Rating } from 'src/user/models/rating.model'
import { BasketController } from './basket.controller'
import { BasketService } from './basket.service'
import { BasketDevice } from './models/basket.device.model'
import { Basket } from './models/basket.model'

@Module({
	providers: [BasketService],
	imports: [
		SequelizeModule.forFeature([
			Basket,
			User,
			Rating,
			BasketDevice,
			Type,
			Device,
			Brand,
			DeviceInfo,
			TypeBrand,
			Role,
		]),
	],
	exports: [BasketService],
	controllers: [BasketController],
})
export class BasketModule {}
