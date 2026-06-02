import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Habilitar CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Pipe de validação global
  app.useGlobalPipes(new ValidationPipe());

  // Servir arquivos estáticos do frontend
  const frontendPath = join(__dirname, '..', '..', '..', 'front_end_usuario', 'tela-compras', 'dist');
  app.useStaticAssets(frontendPath);

  // Rota fallback para SPA (Single Page Application)
  app.use((req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/usuario') || req.path.startsWith('/auth') || req.path.startsWith('/itens-compra') || req.path.startsWith('/categorias') || req.path.startsWith('/prisma')) {
      next();
    } else {
      res.sendFile(join(frontendPath, 'index.html'));
    }
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
