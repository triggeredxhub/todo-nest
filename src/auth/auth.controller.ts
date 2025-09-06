import { Controller,Post, Body, Res, Req, Get} from "@nestjs/common";
import express from "express";
import { AuthService } from "./auth.service";
import { access } from "fs";



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() dto: { username: string; password: string }) {
        const user = await this.authService.register(dto.username, dto.password);
        return { id: user.id, username: user.username };
    }

    @Post('login')
    async login(@Body() dto: { username: string; password: string }, @Res() res: express.Response) {
        const { user, token} = await this.authService.login(dto.username, dto.password);
        res.cookie(
            'jwt',
            token,
            {
                httpOnly: true,
                sameSite: 'lax',
                secure: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            }
        )
        return res.json({user});
    }

    @Post('logout')

    async logout(@Req() res: express.Response) {
        res.clearCookie('jwt');
        return res.sendStatus(200);
    }

    @Get('me')
    async me(@Req()req: express.Request){
        const token = req.cookies['jwt'];
        if(!token){
            return {user: null};
        }
        const payload = await this.authService.verifyToken(token);
        return {user: {
            id: payload.sub,
            username: payload.username
        }};
    }

}