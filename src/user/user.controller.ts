import {
	Body,
	Controller,
	Get,
	Post,
	UseGuards,
	UsePipes,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RolesGuard } from 'src/auth/role.guard'
import { Roles } from 'src/auth/roles-auth.decoratot'
import { ValidationPipe } from './../pipes/validation.pipe'
import { AddRoleDto } from './dto/add.role.dto'
import { BanUserDto } from './dto/ban.user.dto'
import { CreateUserDto } from './dto/create.user.dto'
import { User } from './models/create.user.model'
import { UserService } from './user.service'

@ApiTags('Пользователь')
@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@ApiOperation({ summary: 'Создание пользователя' })
	@ApiResponse({ status: 200, type: User })
	@UsePipes(ValidationPipe)
	@Post()
	createUser(@Body() userDto: CreateUserDto) {
		return this.userService.create(userDto)
	}

	@ApiOperation({ summary: 'Получить всех пользователей' })
	@ApiResponse({ status: 200, type: [User] })
	@Get()
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	getAllUsers() {
		return this.userService.getAll()
	}

	@ApiOperation({ summary: 'Выдать роль' })
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/role')
	addRole(@Body() dto: AddRoleDto) {
		return this.userService.addRole(dto)
	}

	@ApiOperation({ summary: 'Забанить пользователя' })
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/ban')
	ban(@Body() dto: BanUserDto) {
		return this.userService.ban(dto)
	}
}
