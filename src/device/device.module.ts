import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'
import { Role } from 'src/roles/models/roles.model'
import { BasketDevice } from '../basket/models/basket.device.model'
import { Basket } from '../basket/models/basket.model'
import { Brand } from '../brand/models/brand.model'
import { FilesModule } from '../files/files.module'
import { TypeBrand } from '../type/models/type.brand.model'
import { Type } from '../type/models/type.model'
import { User } from '../user/models/create.user.model'
import { Rating } from '../user/models/rating.model'
import { DeviceController } from './device.controller'
import { DeviceService } from './device.service'
import { DeviceInfo } from './models/device.info.model'
import { Device } from './models/device.model'

@Module({
	providers: [DeviceService],
	controllers: [DeviceController],
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
		FilesModule,
	],
})
export class DeviceModule {}
