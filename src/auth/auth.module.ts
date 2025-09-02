import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('SECRET_KEY'),
                signOptions: {
                    expiresIn: configService.get('JWT_EXPIRATION')
                }
            })
           
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}