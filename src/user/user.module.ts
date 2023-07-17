import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'
import { BasketModule } from 'src/basket/basket.module'
import { Role } from 'src/roles/models/roles.model'
import { UserRoles } from 'src/roles/models/user.roles.model'
import { RolesModule } from 'src/roles/roles.module'
import { BasketDevice } from '../basket/models/basket.device.model'
import { Basket } from '../basket/models/basket.model'
import { Brand } from '../brand/models/brand.model'
import { DeviceInfo } from '../device/models/device.info.model'
import { Device } from '../device/models/device.model'
import { TypeBrand } from '../type/models/type.brand.model'
import { Type } from '../type/models/type.model'
import { User } from './models/create.user.model'
import { Rating } from './models/rating.model'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	providers: [UserService],
	controllers: [UserController],
	imports: [
		forwardRef(() => AuthModule),
		SequelizeModule.forFeature([
			User,
			Basket,
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
		RolesModule,
		BasketModule,
	],
	exports: [UserService],
})
export class UserModule {}
