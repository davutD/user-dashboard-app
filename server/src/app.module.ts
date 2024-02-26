import { Module, ValidationPipe } from '@nestjs/common';
import { Neo4jModule } from './neo4j/neo4j.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Neo4jConfig } from './neo4j/neo4j-config.interface';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { EncryptionModule } from './encryption/encryption.module';
import { UserAuthModule } from './user-auth/user-auth.module';
import { UserAuthService } from './user-auth/user-auth.service';
import { UserAuthController } from './user-auth/user-auth.controller';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    //ConfigModule.forRoot({ isGlobal: true }),
    Neo4jModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): Neo4jConfig => ({
        scheme: configService.get('NEO4J_SCHEME'),
        host: configService.get('NEO4J_HOST'),
        port: configService.get('NEO4J_PORT'),
        username: configService.get('NEO4J_USERNAME'),
        password: configService.get('NEO4J_PASSWORD'),
        database: configService.get('NEO4J_DATABASE'),
      }),
      global: true,
    }),
    EncryptionModule,
    UserAuthModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [UserController, AuthController, UserAuthController],
  providers: [
    UserService,
    AuthService,
    UserAuthService,
    ConfigService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
      useValue: {
        forbidNonWhitelisted: true,
        whitelist: true,
        transform: true,
      },
    },
  ],
})
export class AppModule {}
