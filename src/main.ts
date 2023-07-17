import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as process from 'process'
import { AppModule } from './app.module'

async function start() {
	const PORT = process.env.PORT || 3000
	const app = await NestFactory.create(AppModule)

	const config = new DocumentBuilder()
		.setTitle('Online store')
		.setDescription('Документация REST API')
		.setVersion('1.0.0')
		.addTag('API')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('/api/docs', app, document)

	app.listen(PORT, () => {
		console.log(`SERVER WORK! PORT: ${PORT}`)
	})
}

start()
