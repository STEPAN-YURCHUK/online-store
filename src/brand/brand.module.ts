import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'
import { Role } from 'src/roles/models/roles.model'
import { BasketDevice } from '../basket/models/basket.device.model'
import { Basket } from '../basket/models/basket.model'
import { DeviceInfo } from '../device/models/device.info.model'
import { Device } from '../device/models/device.model'
import { TypeBrand } from '../type/models/type.brand.model'
import { Type } from '../type/models/type.model'
import { User } from '../user/models/create.user.model'
import { Rating } from '../user/models/rating.model'
import { BrandController } from './brand.controller'
import { BrandService } from './brand.service'
import { Brand } from './models/brand.model'

@Module({
	controllers: [BrandController],
	providers: [BrandService],
	imports: [
		AuthModule,
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
})
export class BrandModule {}
