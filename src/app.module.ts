import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import * as process from 'process'
import { AuthModule } from './auth/auth.module'
import { BasketModule } from './basket/basket.module'
import { BasketDevice } from './basket/models/basket.device.model'
import { Basket } from './basket/models/basket.model'
import { BrandModule } from './brand/brand.module'
import { Brand } from './brand/models/brand.model'
import { DeviceModule } from './device/device.module'
import { DeviceInfo } from './device/models/device.info.model'
import { Device } from './device/models/device.model'
import { FilesModule } from './files/files.module'
import { Role } from './roles/models/roles.model'
import { UserRoles } from './roles/models/user.roles.model'
import { RolesModule } from './roles/roles.module'
import { TypeBrand } from './type/models/type.brand.model'
import { Type } from './type/models/type.model'
import { TypeModule } from './type/type.module'
import { User } from './user/models/create.user.model'
import { Rating } from './user/models/rating.model'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			isGlobal: true,
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USERNAME,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DATABASE,
			models: [
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
			],
			autoLoadModels: true,
		}),
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static'),
		}),
		UserModule,
		TypeModule,
		BrandModule,
		DeviceModule,
		FilesModule,
		BasketModule,
		RolesModule,
		AuthModule,
	],
})
export class AppModule {}
