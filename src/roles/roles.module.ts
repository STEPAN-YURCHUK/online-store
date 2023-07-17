import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { BasketDevice } from 'src/basket/models/basket.device.model'
import { Basket } from 'src/basket/models/basket.model'
import { Brand } from 'src/brand/models/brand.model'
import { DeviceInfo } from 'src/device/models/device.info.model'
import { Device } from 'src/device/models/device.model'
import { TypeBrand } from 'src/type/models/type.brand.model'
import { Type } from 'src/type/models/type.model'
import { User } from 'src/user/models/create.user.model'
import { Rating } from 'src/user/models/rating.model'
import { Role } from './models/roles.model'
import { UserRoles } from './models/user.roles.model'
import { RolesController } from './roles.controller'
import { RolesService } from './roles.service'

@Module({
	providers: [RolesService],
	controllers: [RolesController],
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
			UserRoles,
		]),
	],
	exports: [RolesService],
})
export class RolesModule {}
