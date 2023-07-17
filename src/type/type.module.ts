import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'
import { Role } from 'src/roles/models/roles.model'
import { BasketDevice } from '../basket/models/basket.device.model'
import { Basket } from '../basket/models/basket.model'
import { Brand } from '../brand/models/brand.model'
import { DeviceInfo } from '../device/models/device.info.model'
import { Device } from '../device/models/device.model'
import { User } from '../user/models/create.user.model'
import { Rating } from '../user/models/rating.model'
import { TypeBrand } from './models/type.brand.model'
import { Type } from './models/type.model'
import { TypeController } from './type.controller'
import { TypeService } from './type.service'

@Module({
	providers: [TypeService],
	controllers: [TypeController],
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
export class TypeModule {}
