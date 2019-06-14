import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';
import { AuthModule } from './auth/auth.module';
import { default as config } from '../km-config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: config.dbUser,
      password: config.dbPass,
      database: 'kitchenman',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      uuidExtension: 'pgcrypto',
    }),
    UserModule,
    RecipeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
