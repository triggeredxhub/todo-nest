import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "src/user/user.entity";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
}