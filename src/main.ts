import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { NotFoundInterceptor } from './common/interceptors/notfound.interceptor';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    app.useGlobalInterceptors([
        new NotFoundInterceptor(),
        new ValidationPipe()
    ]);

    const options = new DocumentBuilder()
                        .setTitle('Nest Examples')
                        .setDescription('The API description')
                        .setVersion('1.0')
                        // .addTag('user')
                        .addTag('project')
                        .addBearerAuth()
                        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api', app, document);

	await app.listen(3000);
}
bootstrap();
