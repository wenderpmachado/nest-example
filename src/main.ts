import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { NotFoundInterceptor } from './common/interceptors/notfound.interceptor';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    app.useGlobalInterceptors([
        new NotFoundInterceptor(),
        new ValidationPipe()
    ]);
	await app.listen(3000);
}
bootstrap();
