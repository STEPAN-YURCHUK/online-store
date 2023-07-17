import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { BasketService } from 'src/basket/basket.service'
import { RolesService } from 'src/roles/roles.service'
import { AddRoleDto } from './dto/add.role.dto'
import { BanUserDto } from './dto/ban.user.dto'
import { CreateUserDto } from './dto/create.user.dto'
import { User } from './models/create.user.model'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		private rolesService: RolesService,
		private backetService: BasketService,
	) {}

	async create(dto: CreateUserDto) {
		const user = await this.userRepository.create(dto)
		const basket = await this.backetService.createBasket(user.id)
		await user.$set('basket', [basket.id])
		user.basket = basket
		const role = await this.rolesService.getRoleByValue('USER')
		await user.$set('roles', [role.id])
		user.roles = [role]
		return user
	}

	async getAll() {
		const users = await this.userRepository.findAll({ include: { all: true } })
		return users
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({
			where: { email },
			include: { all: true },
		})
		return user
	}

	async addRole(dto: AddRoleDto) {
		const user = await this.userRepository.findByPk(dto.userId)
		const role = await this.rolesService.getRoleByValue(dto.value)
		if (role && user) {
			await user.$add('role', role.id)
			return dto
		}
		throw new HttpException(
			'Пользователь или роль не найдены',
			HttpStatus.NOT_FOUND,
		)
	}

	async ban(dto: BanUserDto) {
		const user = await this.userRepository.findByPk(dto.userId)
		if (!user) {
			throw new HttpException('Пользователь не найдены', HttpStatus.NOT_FOUND)
		}
		user.banned = true
		user.banReason = dto.banReason
		await user.save()
		return user
	}
}
