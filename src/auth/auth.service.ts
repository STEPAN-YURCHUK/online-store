import {
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from 'src/user/dto/create.user.dto'
import { User } from 'src/user/models/create.user.model'
import { UserService } from './../user/user.service'

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async login(userDto) {
		const user = await this.validateUser(userDto)
		return this.generateToken(user)
	}

	async registration(userDto) {
		const candidate = await this.userService.getUserByEmail(userDto.email)
		if (candidate) {
			throw new HttpException(
				'Пользователь с таким email уже существует',
				HttpStatus.BAD_REQUEST,
			)
		}
		const hashPassword = await bcrypt.hash(userDto.password, 5)
		const user = await this.userService.create({
			...userDto,
			password: hashPassword,
		})
		return this.generateToken(user)
	}

	async generateToken(user: User) {
		const payload = {
			email: user.email,
			id: user.id,
			roles: user.roles,
		}
		return {
			token: this.jwtService.sign(payload),
		}
	}

	private async validateUser(userDto: CreateUserDto) {
		const user = await this.userService.getUserByEmail(userDto.email)
		const passwordEquals = await bcrypt.compare(userDto.password, user.password)
		if (user && passwordEquals) {
			return user
		}
		throw new UnauthorizedException({ message: 'Некоректный email или Пароль' })
	}
}
