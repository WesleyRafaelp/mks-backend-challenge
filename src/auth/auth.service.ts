import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/users/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOne(email);
        if (user && bcrypt.compareSync(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: LoginDto) {
        const payload = { email: user.username, sub: user.password}
        const userValidate = await this.validateUser(user.username, user.password)
        if (userValidate) {
            return {
                access_token: this.jwtService.sign(payload, {
                    privateKey: jwtConstants.secret, 
                    expiresIn: '5min'
                }),
            }
        }
        throw new NotAcceptableException()
    }
}

